# N8N na Formação AWS: Arquiteturas em Single Mode e Queue Mode no ECS

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Automação de Fluxos de Trabalho (Workflows), N8N Auto-hospedado na AWS, Alta Disponibilidade e Segurança sem IPv4 Público
- **Público:** Engenheiros de Nuvem, Desenvolvedores, Especialistas em Automação e DevOps

---

## O Novo Módulo: N8N Auto-Hospedado na Nuvem

O **N8N** consolidou-se como uma das plataformas open-source e auto-hospedadas mais poderosas do mundo para automação de processos, integração de microsserviços e fluxos orientados a agentes de IA.

Neste módulo exclusivo da Formação AWS 5.0, o aluno aprende a desenhar e implantar o N8N com padrões enterprise de produção na infraestrutura da AWS, cobrindo dois grandes modelos de arquitetura:

---

## 1. N8N em Single Mode (Modo Único)

- **Cenário de Aplicação:** Indicado para ambientes de homologação, testes internos ou operações com volume moderado de execuções.
- **Implementação:** Execução do N8N em container único com persistência de dados em banco relacional gerenciado (Amazon RDS PostgreSQL) e volumes seguros no Amazon EFS.
- **Vantagens:** Simplicidade operacional e baixo custo computacional.

---

## 2. N8N em Queue Mode (Modo Fila Distribuído em Produção)

- **Cenário de Aplicação:** Arquitetura corporativa desenhada para empresas que executam centenas ou milhares de fluxos concorrentes e não podem sofrer com lentidão ou perda de execuções.
- **Arquitetura Distribuída com Amazon ECS:**
  - **N8N Webhooks / Primary Node:** Containers responsáveis exclusivamente por receber webhooks externos e renderizar a interface de usuário.
  - **N8N Workers:** Múltiplos containers workers rodando no Amazon ECS com Fargate/EC2, dedicados unicamente à execução pesada das tarefas dos fluxos.
  - **Fila em Memória (Redis / Valkey com Amazon ElastiCache):** Desacoplamento imediato das execuções para gerenciar o pool de tarefas dos workers.
  - **Banco de Dados Centralizado:** Armazenamento confiável do estado das execuções no Amazon RDS.
- **Auto Scaling de Workers:** Como escalar automaticamente a quantidade de containers workers no ECS à medida que a quantidade de execuções em fila aumenta.

---

## 3. Segurança e Economia: N8N sem IPv4 Público

Uma preocupação comum no mercado atual são os custos adicionais cobrados por endereços IPv4 públicos na AWS e os riscos de segurança de expor instâncias diretamente:
- O módulo ensina a implantar todos os containers do N8N em **Subnets 100% Privadas**, sem alocação de IPs públicos nas tarefas.
- O tráfego externo passa exclusivamente por um **Application Load Balancer (ALB)** com certificado SSL/TLS gratuito do ACM e proteção contra ataques do **AWS WAF**.
- O acesso a serviços externos é feito com segurança via NAT Gateway ou VPC Endpoints.

---

## Dúvidas Frequentes sobre o Módulo de N8N (FAQ)

**Vou aprender a subir o N8N na minha própria conta AWS?**
Sim! Você aprende a fazer o deploy do N8N na AWS com containers, banco de dados gerenciado e alta disponibilidade.

**Qual a diferença entre o Single Mode e o Queue Mode do N8N?**
No Single Mode, todo o N8N roda em um único processo. No Queue Mode (recomendado para produção), a interface é separada dos workers de execução através de filas Redis, permitindo escalar os workers sob demanda no Amazon ECS.

**Por que rodar o N8N sem IPv4 público?**
Para economizar os custos de IPs públicos da AWS e, principalmente, garantir que nenhum container do N8N fique exposto diretamente à internet, mantendo todo o ambiente protegido atrás do Load Balancer e do firewall WAF.

---

## Termos e Palavras-chave para Busca
n8n na aws, n8n single mode, n8n queue mode, n8n ecs, automação de fluxos n8n, redis n8n, n8n sem ipv4 público, n8n alta disponibilidade, workers n8n, deploy n8n docker aws, workflows no code com aws.
