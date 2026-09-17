// V5 - Streaming com Cache de 5 Minutos
// Baseado no v5-streaming.mjs, com prompt caching explícito no system prompt (TTL 5 min).
// O cachePoint instrui o modelo a armazenar o prefixo do system prompt por 5 minutos,
// reduzindo latência e custo nas chamadas seguintes dentro da mesma janela de tempo.
// Exibe métricas de tokens (input, output, cache write, cache read) após cada resposta.

import { BedrockRuntimeClient, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromIni } from "@aws-sdk/credential-providers";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Configurações
const MODEL_ID = "us.anthropic.claude-sonnet-4-5-20250929-v1:0";
const REGION = "us-east-1";

// Configurar cliente Bedrock com profile AWS
const client = new BedrockRuntimeClient({
  region: REGION,
  credentials: fromIni({ profile: process.env.AWS_PROFILE || "default" }),
});

// Ler system prompt do arquivo externo
const scriptDir = dirname(fileURLToPath(import.meta.url));
const systemPrompt = readFileSync(join(scriptDir, "..", "prompt-valendo.txt"), "utf-8");

// Inicializar histórico de mensagens
const messages = [];

// Configurar readline para input interativo
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

console.log("🤖 Chatbot de Venda de Ingressos - V5 Streaming + Cache 5min");
console.log("==============================================================");
console.log("");
console.log("📄 System prompt carregado de: prompt-valendo.txt");
console.log("💡 Cache de 5 minutos ativado no system prompt");
console.log("💡 Digite 'sair' para encerrar");
console.log("");

let running = true;
rl.on("close", () => { running = false; });

while (running) {
  const userInput = await ask("👤 Você: ");

  // Verificar se quer sair
  if (!running || userInput.trim().toLowerCase() === "sair") {
    console.log("👋 Até logo!");
    rl.close();
    break;
  }

  // Ignorar mensagens vazias
  if (!userInput.trim()) {
    continue;
  }

  // Adicionar mensagem do usuário ao histórico
  messages.push({ role: "user", content: [{ text: userInput }] });

  // Invocar Bedrock no modo streaming com cache de 5 min no system prompt
  const response = await client.send(
    new ConverseStreamCommand({
      modelId: MODEL_ID,
      // cachePoint com type "default" aplica TTL de 5 minutos ao system prompt.
      // Na primeira chamada: tokens são escritos no cache (cacheWriteInputTokens).
      // Nas chamadas seguintes (dentro de 5 min): tokens são lidos do cache (cacheReadInputTokens),
      // economizando custo e reduzindo latência.
      system: [
        { text: systemPrompt },
        { cachePoint: { type: "default" } },
      ],
      messages,
      inferenceConfig: { maxTokens: 512, temperature: 0.7 },
    })
  );

  // Processar o stream e imprimir os chunks conforme chegam
  process.stdout.write("\n🎫 Assistente:\n");

  let assistantText = "";
  let usage = null;

  for await (const event of response.stream) {
    // Chunk de texto delta — imprime imediatamente sem quebra de linha
    if (event.contentBlockDelta?.delta?.text) {
      const chunk = event.contentBlockDelta.delta.text;
      process.stdout.write(chunk);
      assistantText += chunk;
    }

    // Métricas de uso (chegam no evento de metadados, ao final do stream)
    if (event.metadata?.usage) {
      usage = event.metadata.usage;
    }
  }

  // Adicionar resposta completa do assistente ao histórico
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
}
