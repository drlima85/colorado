// V4 - Loop Interativo com Histórico
// Versão Node.js do v4-loop-interativo.sh usando @aws-sdk/client-bedrock-runtime

import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromIni } from "@aws-sdk/credential-providers";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Configurações
const MODEL_ID = "us.anthropic.claude-sonnet-4-5-20250929-v1:0";
const REGION = "us-east-1";

// Configurar cliente Bedrock com profile AWS (mesmo do shell: AWS_PROFILE=bedrock-lab)
const client = new BedrockRuntimeClient({
  region: REGION,
  credentials: fromIni({ profile: process.env.AWS_PROFILE || "default" }),
});

// Ler system prompt do arquivo externo (mesmo do shell)
const scriptDir = dirname(fileURLToPath(import.meta.url));
const systemPrompt = readFileSync(join(scriptDir, "..", "prompt-valendo.txt"), "utf-8");

// Inicializar histórico de mensagens vazio
const messages = [];

// Configurar readline para input interativo
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

console.log("🤖 Chatbot de Venda de Ingressos - V4 Loop Interativo");
console.log("======================================================");
console.log("");
console.log("📄 System prompt carregado de: prompt-valendo.txt");
console.log("💡 Digite 'sair' para encerrar");
console.log("");

let running = true;
rl.on("close", () => { running = false; });

while (running) {
  const userInput = await ask("👤 Você: ");

  // Verificar se quer sair
  if (!running || userInput === "sair") {
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

  // Invocar Bedrock
  const response = await client.send(
    new ConverseCommand({
      modelId: MODEL_ID,
      system: [{ text: systemPrompt }],
      messages,
      inferenceConfig: { maxTokens: 512, temperature: 0.7 },
    })
  );

  // Extrair resposta do assistente
  const assistantText = response.output.message.content[0].text;

  // Adicionar resposta do assistente ao histórico
  messages.push({ role: "assistant", content: [{ text: assistantText }] });

  // Mostrar resposta
  console.log("\n🎫 Assistente:");
  console.log(assistantText);
  console.log("");

  // Métricas (opcional, descomente para ver uso de tokens)
  // const { inputTokens, outputTokens } = response.usage;
  // console.log(`📊 Tokens: ${inputTokens} in / ${outputTokens} out\n`);
}
