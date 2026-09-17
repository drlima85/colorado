// V5 - Streaming com Checkpoint (1h e 5min)
// Salva o histórico de mensagens periodicamente e ao encerrar.
// Checkpoint de 1 hora: salvo em checkpoint-1h.json  (substituído a cada hora)
// Checkpoint de 5 min:  salvo em checkpoint-5min.json (substituído a cada 5 min)
// Ao iniciar, oferece restaurar a conversa do último checkpoint disponível.

import { BedrockRuntimeClient, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromIni } from "@aws-sdk/credential-providers";
import { createInterface } from "readline";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const MODEL_ID = "us.anthropic.claude-sonnet-4-5-20250929-v1:0";
const REGION = "us-east-1";

const client = new BedrockRuntimeClient({
  region: REGION,
  credentials: fromIni({ profile: process.env.AWS_PROFILE || "default" }),
});

const scriptDir = dirname(fileURLToPath(import.meta.url));
const systemPrompt = readFileSync(join(scriptDir, "..", "prompt-valendo.txt"), "utf-8");

// ─── Arquivos de checkpoint ───────────────────────────────────────────────────
const CHECKPOINT_1H   = join(scriptDir, "checkpoint-1h.json");
const CHECKPOINT_5MIN = join(scriptDir, "checkpoint-5min.json");

const ONE_HOUR_MS  = 60 * 60 * 1000;   // 3 600 000 ms
const FIVE_MIN_MS  =  5 * 60 * 1000;   //   300 000 ms

// ─── Funções de checkpoint ────────────────────────────────────────────────────
function saveCheckpoint(filePath, messages, label) {
  const payload = {
    savedAt: new Date().toISOString(),
    label,
    messages,
  };
  writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");
  console.log(`\n💾 Checkpoint (${label}) salvo em: ${filePath}`);
}

function loadCheckpoint(filePath) {
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

// ─── Restauração ao iniciar ───────────────────────────────────────────────────
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

console.log("🤖 Chatbot de Venda de Ingressos - V5 Streaming + Checkpoint");
console.log("===============================================================");
console.log("");
console.log("📄 System prompt carregado de: prompt-valendo.txt");
console.log("💡 Digite 'sair' para encerrar");
console.log("💡 Checkpoints: 5 min → checkpoint-5min.json | 1 h → checkpoint-1h.json");
console.log("");

let messages = [];

// Tenta carregar o checkpoint mais recente disponível
const cp5min = loadCheckpoint(CHECKPOINT_5MIN);
const cp1h   = loadCheckpoint(CHECKPOINT_1H);

// Escolhe o checkpoint mais recente entre os dois
let latestCheckpoint = null;
if (cp5min && cp1h) {
  latestCheckpoint = new Date(cp5min.savedAt) >= new Date(cp1h.savedAt) ? cp5min : cp1h;
} else {
  latestCheckpoint = cp5min || cp1h || null;
}

if (latestCheckpoint) {
  console.log(`♻️  Checkpoint encontrado (${latestCheckpoint.label})`);
  console.log(`   Salvo em: ${latestCheckpoint.savedAt}`);
  console.log(`   Mensagens: ${latestCheckpoint.messages.length}`);
  const resp = await ask("   Deseja restaurar a conversa? (s/n): ");
  if (resp.trim().toLowerCase() === "s") {
    messages = latestCheckpoint.messages;
    console.log("✅ Conversa restaurada!\n");
  } else {
    console.log("🆕 Iniciando nova conversa.\n");
  }
} else {
  console.log("🆕 Nenhum checkpoint encontrado. Iniciando nova conversa.\n");
}

// ─── Timers de checkpoint ─────────────────────────────────────────────────────
// Os timers são iniciados após a decisão de restaurar/novo início,
// usando o array `messages` por referência (capturado via closure).
let lastCheckpoint1h   = Date.now();
let lastCheckpoint5min = Date.now();

function checkAndSave() {
  const now = Date.now();

  if (now - lastCheckpoint5min >= FIVE_MIN_MS) {
    saveCheckpoint(CHECKPOINT_5MIN, messages, "5min");
    lastCheckpoint5min = now;
  }

  if (now - lastCheckpoint1h >= ONE_HOUR_MS) {
    saveCheckpoint(CHECKPOINT_1H, messages, "1h");
    lastCheckpoint1h = now;
  }
}

// Verifica os timers periodicamente (a cada 30 s) independente da interação
const timerInterval = setInterval(checkAndSave, 30_000);

// ─── Função de encerramento ───────────────────────────────────────────────────
function shutdown() {
  clearInterval(timerInterval);
  // Salva ambos os checkpoints ao sair
  if (messages.length > 0) {
    saveCheckpoint(CHECKPOINT_5MIN, messages, "5min");
    saveCheckpoint(CHECKPOINT_1H,   messages, "1h");
  }
  console.log("👋 Até logo!");
  rl.close();
}

// ─── Loop principal ───────────────────────────────────────────────────────────
let running = true;
rl.on("close", () => { running = false; });

while (running) {
  const userInput = await ask("👤 Você: ");

  if (!running || userInput.trim().toLowerCase() === "sair") {
    shutdown();
    break;
  }

  if (!userInput.trim()) continue;

  messages.push({ role: "user", content: [{ text: userInput }] });

  const response = await client.send(
    new ConverseStreamCommand({
      modelId: MODEL_ID,
      // Cache aplicado apenas no system prompt.
      // O cachePoint instrui o modelo a armazenar o prefixo do system
      // para reutilização nas chamadas seguintes, reduzindo latência e custo.
      system: [
        { text: systemPrompt },
        { cachePoint: { type: "default" } },
      ],
      messages,
      inferenceConfig: { maxTokens: 512, temperature: 0.7 },
    })
  );

  process.stdout.write("\n🎫 Assistente:\n");

  let assistantText = "";
  let usage = null;

  for await (const event of response.stream) {
    if (event.contentBlockDelta?.delta?.text) {
      const chunk = event.contentBlockDelta.delta.text;
      process.stdout.write(chunk);
      assistantText += chunk;
    }
    // Captura os metadados de uso ao final do stream
    if (event.metadata?.usage) {
      usage = event.metadata.usage;
    }
  }

  messages.push({ role: "assistant", content: [{ text: assistantText }] });

  // Exibe métricas de tokens e cache
  if (usage) {
    console.log("\n");
    console.log("📊 Uso de tokens:");
    console.log(`   🔵 Input tokens:        ${usage.inputTokens ?? 0}`);
    console.log(`   🟢 Output tokens:       ${usage.outputTokens ?? 0}`);
    console.log(`   💾 Cache write tokens:  ${usage.cacheWriteInputTokens ?? 0}`);
    console.log(`   ⚡ Cache read tokens:   ${usage.cacheReadInputTokens ?? 0}`);
    console.log(`   🔢 Total tokens:        ${(usage.inputTokens ?? 0) + (usage.outputTokens ?? 0)}`);
  }

  console.log("");

  // Verifica checkpoint após cada resposta do assistente
  checkAndSave();
}
