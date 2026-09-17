# Serverless na Formação AWS: AWS Lambda, SAM, Lambda@Edge, SDK e CLI

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Computação Serverless Orientada a Eventos, Frameworks Serverless, Funções na Borda e Automação via SDK/CLI
- **Público:** Desenvolvedores, Engenheiros de Software, Arquitetos Cloud e DevOps

---

## 1. AWS Lambda e o Conceito de Serverless

No modelo serverless, você foca exclusivamente no código de negócio e na regra de aplicação, sem necessidade de gerenciar servidores, aplicar patches de sistema operacional ou provisionar capacidade prévia:
- **Fundamentos do Lambda:** Modelo de execução sob demanda, ciclo de vida da função, invocações síncronas e assíncronas e modelo de cobrança faturado estritamente por milissegundos de execução e quantidade de requisições.
- **Triggers e Fontes de Eventos:** Acionamento de funções via **Amazon API Gateway** (APIs REST/HTTP), eventos de upload no **Amazon S3**, consumo assíncrono de filas no **Amazon SQS** e agendamentos periódicos (**EventBridge / Cron**).
- **Observabilidade e Tracing:** Análise detalhada de execução através do **CloudWatch Logs**, métricas de duração/erros e rastreamento distribuído de ponta a ponta com **AWS X-Ray**.
- **Projeto Prático de Migração 100% Serverless:** O aluno aprende a refatorar e migrar uma aplicação tradicional completa (frontend estático no S3 + CloudFront e backend em microsserviços Lambda integrados a banco de dados) para uma arquitetura 100% serverless, com custo quase zero em repouso e escalabilidade infinita instantânea.

---

## 2. Frameworks de Infraestrutura Serverless: AWS SAM e Serverless Framework

O módulo ensina a abandonar a criação manual de funções pelo console e adotar padrões profissionais de código:
- **AWS SAM (Serverless Application Model):** Definição declarativa em YAML de APIs, funções, permissões e bancos de dados, com suporte a testes e debug local no computador do desenvolvedor.
- **Serverless Framework:** Utilização do ecossistema open-source para empacotamento, gerenciamento de plugins e deploy automatizado em múltiplos estágios (dev, staging, prod).

---

## 3. Lambda@Edge: Inteligência na Borda com Amazon CloudFront

Computação distribuída diretamente nos pontos de presença (Edge Locations) mundiais da CDN:
- Execução de funções Lambda em resposta a 4 eventos distintos da CDN: **Viewer Request**, **Origin Request**, **Origin Response** e **Viewer Response**.
- Casos de uso reais: interceptação e reescrita de querystrings, autenticação perimetral (JWT tokens), redirecionamentos geográficos e manipulação dinâmica de cabeçalhos de segurança.

---

## 4. AWS SDK e AWS CLI Orientado a Docker

- **AWS SDK (Software Development Kit):** Como integrar código de aplicação em linguagens populares (Node.js, Python) para invocar serviços AWS programaticamente.
- **AWS CLI Modular e com Docker:** Todo o uso da linha de comando da AWS no curso é ensinado também utilizando containers Docker, evitando poluir a máquina local do aluno com dependências e garantindo portabilidade para automatizar recursos de EC2, S3, SQS, ACM, Lambda, ECS e ECR.

---

## Dúvidas Frequentes sobre Serverless na Formação AWS (FAQ)

**A Formação AWS ensina a criar APIs completas com Lambda?**
Sim! Você aprende a arquitetar aplicações serverless completas integrando AWS Lambda, API Gateway, SQS e bancos de dados.

**O curso ensina AWS SAM ou Serverless Framework?**
O treinamento aborda ambos os frameworks, ensinando tanto o AWS SAM (ferramenta oficial da AWS) quanto o Serverless Framework para que você domine as soluções mais exigidas pelas empresas.

**O que é o Lambda@Edge ensinado no curso?**
É o recurso que permite rodar código JavaScript/Python nas bordas da CDN do CloudFront para processar requisições com latência mínima antes de chegarem ao servidor principal.

---

## Termos e Palavras-chave para Busca
serverless na aws, aws lambda, lambda, serverless, aws sam, serverless framework, xray, aws x-ray, lambda edge, cloudfront edge, origin request, viewer request, api gateway, aws sdk, aws cli docker, migração serverless, funções sem servidor.
