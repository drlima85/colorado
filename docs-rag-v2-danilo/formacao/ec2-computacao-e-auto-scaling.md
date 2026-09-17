# Computação na AWS: Amazon EC2, Launch Templates, Auto Scaling e Fundamentos

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Computação Elástica, Máquinas Virtuais (EC2), Automação de Escalabilidade e Administração de Servidores
- **Público:** Profissionais de TI, DevOps, SysAdmins e Desenvolvedores

---

## 1. Fundamentos da Nuvem e o Módulo "Tela Preta"

Antes de subir arquiteturas avançadas, o aluno aprende os pilares práticos essenciais da infraestrutura em nuvem:
- **Criação de Conta e Governança:** Como ativar a conta AWS com segurança, regras do Free Tier (nível gratuito), modelos de cobrança e estrutura global da AWS (Regiões e Zonas de Disponibilidade - AZs).
- **O Módulo "Tela Preta":** Imersão prática no terminal (Linux e Shell Scripting) para quem nunca operou servidores ou precisa destravar o medo da linha de comando.
- **Conectividade Básica de Rede:** Diferença entre IPv4 público e privado, regras de tráfego de entrada (Inbound) e saída (Outbound) e ferramentas modernas de produtividade com IA no terminal (**Amazon Q CLI** e **KIRO-CLI**).

---

## 2. Amazon EC2 (Elastic Compute Cloud)

O treinamento aprofunda no ciclo de vida completo de instâncias e máquinas virtuais:
- **Famílias e Tipos de Instância:** Escolha adequada de tipos de instância conforme a carga de trabalho (computação, memória, IOPS e redes).
- **Sistemas Operacionais:** Provisionamento e administração prática em ambientes **Linux** (Amazon Linux, Ubuntu) e **Windows Server**.
- **Modelos de Compra e Otimização de Custos:** Diferenças e estratégias práticas entre instâncias **On-Demand**, instâncias reservadas (**Reserved Instances / Savings Plans**), instâncias com créditos de CPU (família T) e instâncias **Spot** (para redução massiva de custos).
- **Armazenamento e Imagens:** Gerenciamento de volumes **Amazon EBS** (Elastic Block Store), snapshots, criação de **AMIs customizadas** (Amazon Machine Images) e alocação de **Elastic IPs**.
- **Conexões Remotas Seguras:**
  - Conexão tradicional via chave **SSH** (Linux) e RDP (Windows).
  - Acesso moderno e seguro via **AWS Systems Manager (SSM) Session Manager** (sem necessidade de abrir portas SSH ou manter IPs públicos).
  - Uso de **EC2 Instance Connect** e **EC2 Instance Connect Endpoint** para conexões diretas a instâncias em subnets totalmente privadas.

---

## 3. Launch Templates (Modelos de Inicialização)

Padronização do provisionamento de instâncias na AWS:
- Configuração de tipo de máquina, Security Groups, perfis de segurança IAM (**Instance Profile**) e mapeamento de volumes de armazenamento.
- Automação do primeiro boot através de scripts de inicialização (**User Data**), utilizando Shell Script para distribuições Linux e PowerShell para Windows.
- Definição de AMIs base para inicialização rápida e integração direta com Auto Scaling Groups.

---

## 4. Auto Scaling Groups (ASG) e Elasticidade

Como fazer a infraestrutura crescer e diminuir automaticamente de acordo com a demanda real:
- **Políticas de Escalabilidade:** Scale Out (aumentar servidores) e Scale In (reduzir servidores) com base em métricas de utilização de CPU, memória, tamanho de filas no SQS ou agendamentos de horário (Schedule).
- **Capacity Providers e Integração com Containers:** Como utilizar o Auto Scaling Group gerenciando capacidade para clusters de containers com Amazon ECS.
- **Estratégias de Redução de Custo:** Mesclagem de instâncias On-Demand com Spot Instances para garantir alta tolerância a falhas pagando até 80% menos.

---

## Dúvidas Frequentes sobre o Módulo de EC2 e Computação (FAQ)

**A formação ensina a conectar em instâncias EC2 sem IP público?**
Sim! É ensinado o uso avançado do AWS Systems Manager (SSM) Session Manager e do EC2 Instance Connect Endpoint para conectar em servidores Windows e Linux em subnets privadas sem abrir porta 22 (SSH) nem porta 3389 (RDP) para a internet.

**O curso aborda instâncias Spot para economizar na nuvem?**
Sim, são ensinadas as estratégias de uso de Spot Instances e mescla com instâncias On-Demand dentro de Auto Scaling Groups.

**Quem nunca usou Linux consegue aprender?**
Sim. O módulo inicial "Tela Preta" foi desenvolvido especificamente para nivelar o conhecimento em Linux e Shell Script do zero.

---

## Termos e Palavras-chave para Busca
ec2, computação na aws, instâncias ec2, launch template, auto scaling group, asg, ssm, ssh, ec2 instance connect, spot instances, reserved instances, ami, ebs, user data, shell script, linux na aws, tela preta, capacidade elástica, free tier.
