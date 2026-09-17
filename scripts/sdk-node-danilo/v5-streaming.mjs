// V5 - Streaming com Loop Interativo
// Versão streaming do v4-loop-interativo.mjs usando ConverseStreamCommand

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

console.log("🤖 Chatbot de Venda de Ingressos - V5 Streaming");
console.log("================================================");
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

  // Invocar Bedrock no modo streaming
  const response = await client.send(
    new ConverseStreamCommand({
      modelId: MODEL_ID,
      system: [{ text: systemPrompt }],
      messages,
      inferenceConfig: { maxTokens: 512, temperature: 0.7 },
    })
  );

  // Processar o stream e imprimir os chunks conforme chegam
  process.stdout.write("\n🎫 Assistente: ");

  let assistantText = "";
  let inputTokens = 0;
  let outputTokens = 0;

  for await (const chunk of response.stream) {
    // Chunk de texto delta — imprime imediatamente sem quebra de linha
    if (chunk.contentBlockDelta?.delta?.text) {
      const delta = chunk.contentBlockDelta.delta.text;
      process.stdout.write(delta);
      assistantText += delta;
    }

    // Métricas de uso (chegam no evento de metadados, ao final do stream)
    if (chunk.metadata?.usage) {
      inputTokens = chunk.metadata.usage.inputTokens;
      outputTokens = chunk.metadata.usage.outputTokens;
    }
  }

  // Quebra de linha após o stream encerrar
  console.log("\n");

  // Adicionar resposta completa do assistente ao histórico
  messages.push({ role: "assistant", content: [{ text: assistantText }] });

  // Métricas (descomente para ver uso de tokens)
  // console.log(`📊 Tokens: ${inputTokens} in / ${outputTokens} out\n`);
}
