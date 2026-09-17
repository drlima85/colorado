# Projeto BIA na Formação AWS: Arquiteturas em Escala, Versão Serverless e BIA 2026

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Tema:** O Projeto BIA — a aplicação real utilizada como fio condutor prático de todo o treinamento
- **Público:** Alunos e interessados que buscam entender como a teoria é aplicada na prática em um projeto contínuo

---

## O que é o Projeto BIA?

O **Projeto BIA** é a aplicação comercial real desenvolvida e mantida pelos alunos ao longo da Formação AWS. Em vez de utilizar exemplos teóricos desconexos, todos os módulos convergem para a evolução, escalabilidade, segurança e modernização contínua da BIA.

A aplicação passa por diferentes fases arquiteturais ao longo do curso:

---

## 1. BIA Auto Scaling e Resiliência em Containers

Nesta fase, a aplicação BIA roda sobre o **Amazon ECS** com estratégias avançadas de escala e distribuição:
- **Políticas de Scale In e Scale Out:** Ajuste dinâmico da contagem de tarefas/containers em resposta a picos de acessos e utilização de recursos.
- **Capacity Providers e Gestão de Capacidade:** Integração do ECS com Auto Scaling Groups de instâncias EC2 subjacentes.
- **Estratégias de Posicionamento de Tarefas (Task Placement):**
  - **AZ Balanced Spread:** Distribuição equilibrada dos containers entre diferentes Zonas de Disponibilidade para máxima tolerância a falhas.
  - **AZ Balanced Binpack e Binpack:** Alocação densa de containers por menor custo computacional, agrupando tarefas para minimizar instâncias ativas ociosas.

---

## 2. BIA Serverless: Arquitetura Orientada a Eventos

Aqui, a BIA é inteiramente refatorada para rodar sem servidores dedicados:
- **Backend Serverless com AWS SAM:** Modelagem em código, depuração e testes locais no computador com o emulador do AWS SAM.
- **Conexão Segura com Banco de Dados:** Otimização de pools de conexão e consumo de variáveis seguras.
- **Frontend Estático de Alta Performance:** Deploy de arquivos estáticos via AWS CLI no Amazon S3, distribuídos mundialmente com **Amazon CloudFront CDN**.
- **Otimização de Performance e Segurança:** Ajuste de memória no Lambda, configuração de CORS (Cross-Origin Resource Sharing), compressão de cache e proteção de origem com **Origin Access Control (OAC)**.

---

## 3. BIA 2026 (Novo Módulo de Modernização com IA e Microsserviços)

A evolução mais recente do projeto BIA na Formação AWS 5.0 traz arquiteturas de ponta:
- **BIA 100% com Inteligência Artificial:** Integração nativa com LLMs e agentes de IA para enriquecimento das regras de negócio.
- **BIA Blue/Green Deployment:** Atualizações de versão sem zero segundos de downtime.
- **BIA ECS Multi-Service com Service Discovery:** Decomposição da BIA em múltiplos microsserviços desacoplados conversando entre si por DNS privado.
- **BIA Cache:** Aceleração com ElastiCache (Redis/Valkey).
- **BIA EKS (Em breve):** A BIA orquestrada em ambiente Kubernetes corporativo.

---

## Dúvidas Frequentes sobre o Projeto BIA (FAQ)

**O que é o projeto BIA?**
É a aplicação prática que você constrói e evolui ao longo da formação. Ela serve como laboratório contínuo onde você implementa containers, banco de dados, esteira de CI/CD, auto scaling, serverless e inteligência artificial.

**A BIA é feita em containers ou serverless?**
Você aprende a fazer as duas arquiteturas! Primeiro você roda a BIA em containers com ECS e Docker; depois você aprende a transformá-la em uma arquitetura 100% serverless com Lambda, API Gateway e CloudFront.

**O que aborda o módulo BIA 2026?**
Aborda a versão mais moderna da aplicação, com múltiplos microsserviços, descoberta automática de serviços (Service Discovery), cache em memória e integração profunda com IA.

---

## Termos e Palavras-chave para Busca
projeto bia, bia aws, bia auto scaling, bia serverless, bia 2026, task placement, binpack, balanced spread, sam serverless, deploy front cdn, oac, bia ecs, bia multi service, projeto prático curso aws.
