# Containers e Orquestração na Formação AWS: ECS, ECR, EKS e Elastic Beanstalk

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Orquestração de Microsserviços em Containers, Registro de Imagens, Kubernetes e Plataforma Gerenciada
- **Público:** Desenvolvedores, Engenheiros DevOps e Especialistas em Infraestrutura Moderna

---

## 1. Amazon ECS (Elastic Container Service) e Fargate

O Amazon ECS é o orquestrador nativo de containers da AWS, amplamente utilizado ao longo de toda a Formação AWS no projeto prático BIA:
- **Componentes Fundamentais:** Estruturação de **Clusters**, criação de **Task Definitions** (declaração de containers, limites de recursos e variáveis de ambiente), instanciação de **Tasks** e manutenção de alta disponibilidade com **Services**.
- **Modelos de Execução:**
  - **AWS Fargate:** Execução serverless de containers onde a AWS gerencia a infraestrutura subjacente de servidores.
  - **EC2 com Capacity Providers:** Gerenciamento de clusters ECS rodando sobre instâncias EC2 com Auto Scaling automatizado de capacidade.
- **Estratégias de Deploy:**
  - **Rolling Update:** Atualização contínua e gradual de containers sem interrupção de serviço.
  - **Blue/Green Deployment:** Troca atômica de tráfego entre versões com validação e rollback automático via AWS CodeDeploy.
- **Recursos Modernos do ECS:**
  - **ECS Exec (New):** Abertura de terminal interativo diretamente dentro de um container rodando no ECS para inspeção e troubleshooting rápido.
  - **Service Discovery (New):** Descoberta automática de microsserviços via DNS privado integrado ao AWS Cloud Map.
  - **ECS Express (New):** Inicialização e deploy acelerado de microsserviços.

---

## 2. Amazon ECR (Elastic Container Registry)

Repositório gerenciado e seguro de imagens Docker da AWS:
- Criação e governança de repositórios privados de imagens de containers.
- Gerenciamento de tags semânticas e versionamento de imagens.
- Integração nativa de permissões IAM para permitir downloads e builds seguros no ECS, EKS e Beanstalk.

---

## 3. AWS Elastic Beanstalk (PaaS para Aplicações e Containers)

Plataforma como Serviço (PaaS) para quem busca velocidade e facilidade no deploy:
- Configuração de ambientes Single-Instance (para desenvolvimento/custo baixo) e ambientes com **Load Balancer** (para produção escalável).
- Deploy automatizado com suporte a **Docker** e **docker-compose**.
- Políticas de atualização: Rolling Deployment, Rolling com batch adicional e Imutável.
- Monitoramento de saúde com Health Checks avançados e automação via **EB CLI**.
- Implantação de Beanstalk em subnets totalmente privadas com Shared Load Balancer.

---

## 4. Kubernetes e Amazon EKS (Elastic Kubernetes Service)

A Formação AWS também capacita os alunos no orquestrador open-source mais demandado do mercado:
- **Fundamentos de Kubernetes:** Arquitetura do Control Plane, Worker Nodes, Pods, ReplicaSets, Deployments e Services.
- **Ferramental:** Operação local e remota com `kubectl` e Minikube.
- **Resolução de Problemas (Troubleshooting):** Uso prático de `kubectl describe`, `kubectl logs` e `kubectl exec` para depurar pods em falha.
- **Amazon EKS:** Provisionamento de clusters Kubernetes gerenciados na AWS, integração com VPC, IAM Roles for Service Accounts (IRSA) e Load Balancers nativos da nuvem.

---

## Dúvidas Frequentes sobre o Módulo de Containers (FAQ)

**A formação ensina a colocar aplicação em containers na nuvem?**
Sim! Você aprende todo o ciclo: criar o Dockerfile, fazer o push para o Amazon ECR, criar o cluster no Amazon ECS (com Fargate ou EC2) e publicar a aplicação na internet.

**Qual a diferença entre ECS e EKS ensinada no curso?**
O ECS é a solução nativa e simplificada da AWS para containers; o EKS é a solução gerenciada para Kubernetes. O curso ensina as duas abordagens e quando escolher cada uma no mercado.

**O que é o recurso ECS Exec que o curso ensina?**
É o recurso que permite abrir um terminal interativo (shell) dentro de um container em execução no ECS para debugar problemas sem precisar instalar servidor SSH no container.

---

## Termos e Palavras-chave para Busca
containers na aws, ecs, amazon ecs, ecr, elastic container registry, fargate, task definition, ecs service, capacity provider, rolling update, blue green deployment, ecs exec, service discovery, elastic beanstalk, eb cli, kubernetes, eks, amazon eks, kubectl, pods, deployments yaml.
