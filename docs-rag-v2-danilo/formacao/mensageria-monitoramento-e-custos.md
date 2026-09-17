# Mensageria Assíncrona, Observabilidade e Gestão de Custos: SQS, SNS e CloudWatch

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Arquiteturas Desacopladas (SQS/SNS), Alarmes e Métricas (CloudWatch) e Gestão Financeira de Nuvem (FinOps e Custos)
- **Público:** Arquitetos de Soluções, Engenheiros de Software, DevOps e Tech Leads

---

## 1. Amazon SQS (Simple Queue Service): "Praticamente um Curso Dentro do Curso"

O módulo de mensageria é um dos mais completos da Formação AWS, ensinando a desacoplar sistemas monolíticos e construir arquiteturas assíncronas altamente resilientes:
- **Conceito de Desacoplamento:** Comparativo prático entre uma aplicação síncrona sem fila (onde picos de tráfego derrubam o banco ou o backend) versus uma aplicação moderna orientada a eventos e filas.
- **Tipos de Filas:**
  - **Filas Standard:** Throughput praticamente ilimitado e entrega "pelo menos uma vez" para altíssima escala.
  - **Filas FIFO (First-In-First-Out):** Garantia estrita de ordem sequencial e eliminação de duplicações de mensagens (Message Deduplication).
- **Recursos Avançados de Fila:**
  - **Delivery Delay:** Atraso controlado na entrega de novas mensagens.
  - **Visibility Timeout:** Tempo em que a mensagem fica oculta para outros consumidores enquanto é processada.
  - **Dead Letter Queue (DLQ) e Redrive Policy:** Isolamento automático de mensagens corrompidas ou com falha recorrente para auditoria e reprocessamento posterior.
- **Escalabilidade Baseada em Fila (Queue-Based Auto Scaling):** Como configurar o Auto Scaling Group e o Amazon ECS para adicionar novos containers ou instâncias automaticamente à medida que o número de mensagens acumuladas na fila aumenta.
- **Integração:** Consumo nativo com AWS Lambda e tarefas em background no AWS Fargate.

---

## 2. Amazon SNS (Simple Notification Service): Mensageria Pub/Sub

Comunicação pub/sub (publicador e assinantes) para envio em massa e integração entre microsserviços:
- Criação de **Tópicos** e subscrições para múltiplos destinos simultâneos (**Fan-out pattern**).
- Disparo de notificações transacionais via **SMS**, e-mail e webhooks.
- Disparo automático de eventos do SNS para alimentar múltiplas filas SQS em paralelo.

---

## 3. Amazon CloudWatch: Observabilidade e Monitoramento

A central de visibilidade operacional do ecossistema AWS:
- Coleta de métricas nativas e criação de **Métricas Customizadas**.
- Criação de **Dashboards Operacionais** unificados para acompanhamento da saúde dos serviços.
- Configuração de **Alarmes do CloudWatch** disparando ações automáticas: acionar políticas de Auto Scaling ou enviar notificações urgentes para canais de incidentes via SNS.

---

## 4. FinOps e Gestão Estratégica de Custos na AWS

O aluno aprende a gerenciar os custos da nuvem para evitar surpresas na fatura:
- **Entendendo o AWS Billing e Cost Explorer:** Análise detalhada de consumo por serviço, tags de alocação de custo e histórico de cobrança.
- **AWS Budgets:** Configuração de alertas de orçamento para disparar e-mails antes que o limite financeiro mensal seja ultrapassado.
- **Projeção de Custos com TCO (Total Cost of Ownership):** Como calcular e projetar o custo real de migrar servidores legados para a nuvem utilizando a AWS Pricing Calculator.

---

## Dúvidas Frequentes sobre Mensageria e Custos (FAQ)

**Por que o módulo de SQS é chamado de "praticamente um curso"?**
Porque ele vai muito além do básico: ensina a diferença entre filas Standard e FIFO, tratamento de falhas com Dead Letter Queue (DLQ), e como escalar containers no ECS com base no tamanho da fila.

**A formação ensina a controlar a fatura e não tomar susto com a conta da AWS?**
Sim! O módulo de custos ensina a configurar alertas de orçamento no AWS Budgets, interpretar relatórios do Cost Explorer e aplicar estratégias de redução de custos desde o primeiro dia.

**Como o SNS e o SQS trabalham juntos?**
O curso ensina o padrão Fan-Out: uma mensagem publicada em um tópico SNS é replicada automaticamente para várias filas SQS simultâneas, permitindo que diferentes microsserviços processem a informação de forma independente.

---

## Termos e Palavras-chave para Busca
mensageria, sqs, amazon sqs, filas standard e fifo, dlq, dead letter queue, redrive policy, escalabilidade baseada em fila, sns, amazon sns, pub sub, notificações sms, cloudwatch, alarmes cloudwatch, métricas, finops, custos na aws, billing, cost explorer, orçamentos, aws budgets, tco calculadora.
