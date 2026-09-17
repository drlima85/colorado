# IA Generativa e o Curso Completo de Amazon Bedrock na Formação AWS

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Inteligência Artificial Generativa, Modelos Fundacionais (LLMs), Engenharia de Prompt e Amazon Bedrock
- **Público:** Desenvolvedores, Engenheiros de IA, Arquitetos de Nuvem e Profissionais de Tecnologia

---

## 1. AWS & IA Aplicada ao Desenvolvimento

A Formação AWS integra inteligência artificial generativa diretamente no fluxo de trabalho de engenharia de software e infraestrutura em nuvem:
- **Consumo de MCP Servers (Model Context Protocol):** Como conectar agentes de IA a servidores de contexto para inspecionar, depurar e manipular recursos de nuvem com segurança.
- **Amazon Q CLI no Terminal:** Instalação, autenticação e configuração do assistente oficial da AWS na linha de comando para acelerar comandos, scripts e diagnósticos.
- **Contextos e Rules:** Definição de regras estritas e contexto arquitetural para assistentes de código, garantindo que o código gerado siga os padrões de segurança da empresa.
- **Infraestrutura com Linguagem Natural:** Criação e alteração de templates de infraestrutura e containerização utilizando comandos em linguagem natural assistidos por IA.

---

## 2. Amazon Bedrock: O Novo Curso Completo Incluso na Formação

Os alunos da Formação AWS têm acesso a um **curso completo dedicado ao Amazon Bedrock**, cobrindo desde a fundação dos modelos de linguagem até a construção de assistentes comerciais inteligentes com RAG e ferramentas:

### Fundamentos de LLMs e Mecânica de Cobrança
- **Modelos Fundacionais (FMs):** Acesso a modelos de ponta (como a família **Anthropic Claude 3.5 / 4.6**, Amazon Titan, Meta Llama) via API única e segura sem sair da infraestrutura da AWS.
- **Tokens e Economia da IA:** O que são tokens de Input e Output, como calcular custos e entender com precisão a fatura de modelos generativos.

### Estrutura de Chamadas e Engenharia de Prompt
- **Estrutura Padrão de Requisição:** Anatomia das mensagens da Converse API — `system prompt`, `messages` (turnos de conversa) e especificação de `tools` (Function Calling).
- **Técnicas Avançadas de Prompting:** Zero-shot, Few-shot (exemplos no prompt) e Chain of Thought (COT) para raciocínio lógico em etapas.
- **Parâmetros de Inferência:** Ajuste fino de `temperature` (criatividade vs determinismo), `top_p`, `max_tokens` e `stop sequences`.

### Performance, Economia e Segurança em Produção
- **Streaming de Respostas:** Retorno de respostas palavra por palavra (Server-Sent Events) via SDK para experiência de usuário fluida.
- **Prompt Caching (Cache de Contexto):** Como utilizar checkpoints de cache de 5 minutos ou 1 hora no Bedrock para reaproveitar prompts gigantescos pagando apenas uma fração do preço em turnos recorrentes.
- **RAG (Retrieval-Augmented Generation):** Integração com **Amazon Bedrock Knowledge Bases** e bancos vetoriais (S3 Vectors, OpenSearch) para permitir que o modelo responda com base estrita em documentos corporativos privados sem alucinações.
- **Amazon Bedrock Guardrails:** Criação de barreiras de segurança para bloquear tópicos sensíveis, mascarar dados pessoais (PII), filtrar palavras de baixo calão e prevenir ataques de jailbreak/prompt injection.

### Implementações Práticas Reais
- Laboratórios práticos via **AWS CLI**.
- Projetos completos em código utilizando o **AWS SDK para Node.js / JavaScript** (criando bots interativos com loop de conversa, streaming, chamadas automáticas de tools e injeção de contexto RAG).

---

## Dúvidas Frequentes sobre o Curso de Amazon Bedrock (FAQ)

**O curso de Amazon Bedrock está incluído na Formação AWS?**
Sim! O curso completo de Amazon Bedrock é um conteúdo integrante da grade da Formação AWS 5.0, sem qualquer custo adicional para os alunos.

**Vou aprender a criar assistentes inteligentes com RAG e Tools?**
Sim! O curso ensina passo a passo como fazer Retrieval-Augmented Generation (RAG) usando Bedrock Knowledge Bases, como criar tools (chamada de funções externas) e como proteger o bot usando Guardrails.

**O curso ensina a economizar tokens com Prompt Caching?**
Sim! É ensinado em detalhes como configurar o Prompt Caching de 1 hora ou 5 minutos para reduzir custos em conversas longas e economizar na fatura da AWS.

---

## Termos e Palavras-chave para Busca
amazon bedrock, curso bedrock, ia generativa aws, llm, claude anthropic na aws, engenharia de prompt, tokens input output, streaming bedrock, prompt caching, cache de prompt, rag na aws, knowledge bases, banco vetorial s3 vectors, guardrails bedrock, amazon q cli, mcp server, sdk node bedrock.
