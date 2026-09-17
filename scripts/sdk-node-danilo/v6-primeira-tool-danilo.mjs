// V6 - Primeira Tool: o agente consulta a matrícula do aluno
//
// Sem streaming de propósito: aqui o conceito novo é o loop de tool use.
// A versão com streaming vem depois (v7).

import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const MODEL_ID = "us.anthropic.claude-sonnet-4-6";

const client = new BedrockRuntimeClient({
  region: "us-east-1",
  profile: process.env.AWS_PROFILE || "default",
});

const scriptDir = dirname(fileURLToPath(import.meta.url));
const PROMPT_FILE = process.env.PROMPT_FILE || "prompt-valendo-Danilo.txt";
const systemPrompt = readFileSync(join(scriptDir, "..", PROMPT_FILE), "utf-8");

// 1. A "base de dados" da tool
// ponytail: map em memória; troca por DynamoDB/RDS quando existir de verdade
const ALUNOS = {
  "maria@email.com": { nome: "Maria", ingresso: "VIP", status: "confirmado", pedido: "HP-88213", data_pagamento: "01/01/2027" },
  "joao@email.com": { nome: "João", ingresso: "Normal", status: "pendente", pedido: "HP-77104" },
};

function consultarMatricula({ email }) {
  const limpo = (email ?? "").trim().toLowerCase();
  const aluno = ALUNOS[limpo];
  return aluno ? { encontrado: true, ...aluno } : { encontrado: false };
}

// Link de pagamento customizado
const LINK_PAGAMENTO = process.env.LINK_PAGAMENTO || "https://formacaoaws.com.br/link-pagamento";

function gerarLinkPagamento({ email }) {
  const limpo = (email ?? "").trim().toLowerCase();
  if (!limpo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpo)) {
    return {
      gerado: false,
      motivo: "e-mail inválido ou não informado. Solicite um e-mail válido para gerar o link.",
    };
  }

  // Verificação defensiva no código usando consultarMatricula para evitar pagamento duplicado
  const matricula = consultarMatricula({ email: limpo });
  if (matricula.encontrado && matricula.status === "confirmado") {
    return {
      gerado: false,
      motivo: "aluno já possui matrícula com pagamento confirmado",
      pedido: matricula.pedido,
      data_pagamento: matricula.data_pagamento,
      mensagem: `Atenção: o pagamento do aluno ${matricula.nome} já foi confirmado anteriormente (Pedido: ${matricula.pedido}, Data: ${matricula.data_pagamento}). Não é necessário gerar novo link de pagamento.`,
    };
  }

  return {
    gerado: true,
    email: limpo,
    link: LINK_PAGAMENTO,
    mensagem: `Link de pagamento gerado com sucesso: ${LINK_PAGAMENTO}`,
  };
}

// 2. A declaração da tool para o modelo
//    description é o que o modelo lê pra decidir SE chama a tool.
//    Prompt ruim aqui = tool que nunca dispara (ou dispara sempre).
const toolConfig = {
  tools: [
    {
      toolSpec: {
        name: "consultar_matricula",
        description:
          "Consulta a matrícula de um aluno pelo e-mail de compra. " +
          "Use quando a pessoa perguntar se a compra dela foi confirmada, " +
          "qual ingresso ela tem, ou o número do pedido. " +
          "Só chame se a pessoa já tiver informado o e-mail.",
        inputSchema: {
          json: {
            type: "object",
            properties: {
              email: { type: "string", description: "E-mail usado na compra do ingresso" },
            },
            required: ["email"],
          },
        },
      },
    },
    {
      toolSpec: {
        name: "gerar_link_pagamento",
        description:
          "Gera o link de pagamento do ingresso. " +
          "Use quando a pessoa quiser comprar, pagar ou finalizar a compra. " +
          "Só chame depois que a pessoa informar o e-mail. " +
          "OBRIGATÓRIO antes de chamar esta tool: chame consultar_matricula com o " +
          "mesmo e-mail para verificar se a pessoa já efetuou o pagamento e evitar cobrança duplicada. " +
          "Se consultar_matricula retornar status 'confirmado', NÃO chame esta tool — a " +
          "pessoa já pagou, avise isso e informe o número do pedido. " +
          "Só gere o link se a matrícula não existir ou se o status for 'pendente'.",
        inputSchema: {
          json: {
            type: "object",
            properties: {
              email: { type: "string", description: "E-mail para envio do link de pagamento" },
            },
            required: ["email"],
          },
        },
      },
    },
  ],
};

// Executor local: nome da tool -> função
const EXECUTORES = {
  consultar_matricula: consultarMatricula,
  gerar_link_pagamento: gerarLinkPagamento,
};

const MAX_TURNOS_TOOL = 5;

const messages = [];

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

console.log("🤖 Chatbot de Venda de Ingressos - LAB AWS Danilo (V6)");
console.log("=====================================================");
console.log("");
console.log("🎓 Produto: Lab formacao AWS Danilo com Henrille Maia");
console.log(`📄 System prompt carregado de: ${PROMPT_FILE}`);
console.log("🗄️  Cache: 1h (system prompt)");
console.log("🔧 Tools disponíveis: consultar_matricula(email), gerar_link_pagamento(email)");
console.log("💡 Teste (status da compra): 'minha compra saiu? meu email é maria@email.com'");
console.log("💡 Teste (já pago / evita duplicidade): 'quero pagar o VIP, vou assistir ao vivo, meu email é maria@email.com'");
console.log("💡 Teste (pendente / gera link): 'quero pagar o Normal, vou assistir ao vivo, meu email é joao@email.com'");
console.log("💡 Digite 'sair' para encerrar");
console.log("");

let running = true;
rl.on("close", () => { running = false; });

while (running) {
  const userInput = await ask("👤 Você: ");

  if (!running || userInput === "sair") {
    console.log("👋 Até logo!");
    rl.close();
    break;
  }

  messages.push({ role: "user", content: [{ text: userInput }] });

  let usage = {};

  // 3. O loop de tool use
  //    O modelo pode pedir a tool, ler o resultado e pedir OUTRA.
  //    Por isso é loop, não if.
  //    O teto existe pra um loop maluco não torrar token: cada volta
  //    é uma request cobrada.
  for (let turno = 0; ; turno++) {
    if (turno >= MAX_TURNOS_TOOL) {
      console.log(`\n⚠️  Limite de ${MAX_TURNOS_TOOL} chamadas de tool atingido. Parando.`);
      break;
    }

    const response = await client.send(
      new ConverseCommand({
        modelId: MODEL_ID,
        system: [
          { text: systemPrompt },
          //{ text: "Você tem a tool consultar_matricula. Peça o e-mail antes de usá-la. Nunca invente dados de matrícula." },
          { cachePoint: { type: "default", ttl: "1h" } },
        ],
        messages,
        toolConfig,
        inferenceConfig: { maxTokens: 512, temperature: 0.7 },
      })
    );

    usage = response.usage ?? {};
    const assistantMessage = response.output.message;

    // Sempre devolve a resposta do modelo pro histórico, inclusive o bloco toolUse
    messages.push(assistantMessage);

    if (response.stopReason !== "tool_use") {
      const assistantText = assistantMessage.content
        .filter((b) => b.text)
        .map((b) => b.text)
        .join("");

      process.stdout.write("\n🎫 Assistente:\n");
      process.stdout.write(assistantText);
      break;
    }

    // 4. Executa cada tool pedida e devolve os toolResult
    //    Regra: um toolResult por toolUse, todos na MESMA mensagem user.
    const toolResults = [];

    for (const bloco of assistantMessage.content) {
      if (!bloco.toolUse) continue;

      const { toolUseId, name, input } = bloco.toolUse;
      console.log(`\n🔧 Tool chamada: ${name}(${JSON.stringify(input)})`);

      const executor = EXECUTORES[name];
      let resultado;
      let status = "success";

      try {
        if (!executor) {
          resultado = { erro: `tool desconhecida: ${name}` };
          status = "error";
        } else {
          resultado = executor(input);
        }
      } catch (err) {
        resultado = { erro: err.message ?? "Erro interno ao executar a tool" };
        status = "error";
      }

      console.log(`   ↳ resultado: ${JSON.stringify(resultado)}`);

      toolResults.push({
        toolResult: {
          toolUseId,
          content: [{ json: resultado }],
          status,
        },
      });
    }

    messages.push({ role: "user", content: toolResults });
  }

  const output = usage.outputTokens ?? 0;
  const cacheRead = usage.cacheReadInputTokens ?? 0;
  const cacheWrite = usage.cacheWriteInputTokens ?? 0;
  const inputSemCache = usage.inputTokens ?? 0;
  const input = inputSemCache + cacheRead;

  console.log("\n");
  console.log("┌─────────────────────────────────────────┐");
  console.log("│            📊 Consumo de Tokens          │");
  console.log("├─────────────────────────────────────────┤");
  console.log(`│ Input total:        ${String(input).padStart(8)}  tokens  │`);
  console.log(`│   ├ Cache read:     ${String(cacheRead).padStart(8)}  (10% do preço) │`);
  console.log(`│   ├ Cache write:    ${String(cacheWrite).padStart(8)}  (200% do preço)│`);
  console.log(`│   └ Sem cache:      ${String(inputSemCache).padStart(8)}  (preço cheio)│`);
  console.log(`│ Output:             ${String(output).padStart(8)}  tokens  │`);
  console.log("└─────────────────────────────────────────┘");
  console.log("");
}
