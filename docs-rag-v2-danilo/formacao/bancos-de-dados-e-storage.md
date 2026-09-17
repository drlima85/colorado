# Bancos de Dados e Armazenamento na Formação AWS: RDS, Aurora, S3, EFS e ElastiCache

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Persistência de Dados Relacional, Storage de Objetos, Sistema de Arquivos em Rede e Cache em Memória
- **Público:** Administradores de Banco de Dados (DBAs), Desenvolvedores Backend, Engenheiros de Dados e Arquitetos Cloud

---

## 1. Amazon RDS e Amazon Aurora (Bancos de Dados Relacionais Gerenciados)

O módulo ensina a eliminar a complexidade de manter bancos de dados em servidores dedicados utilizando os serviços relacionais gerenciados da AWS:
- **Provisionamento e Configuração de Motores:** Criação e parametrização de bancos relacionais líderes de mercado (PostgreSQL, MySQL e SQL Server).
- **Amazon Aurora e Aurora Serverless:** Arquitetura de banco com escalabilidade sob demanda, autoscaling de capacidade e performance até 5x superior ao MySQL tradicional.
- **Modelos de Custo:** Planejamento de capacidade comparando instâncias On-Demand contra instâncias Reservadas para redução de custos.
- **Alta Disponibilidade e Resiliência (Multi-AZ):**
  - Implementação de **Multi-AZ Deployments** com replicação síncrona e failover automático sem interrupção do negócio.
  - **Aurora Multi-AZ DB Cluster** e **Aurora Global Database** para recuperação de desastres entre múltiplas regiões da AWS.
- **Backup, Restauração e Recuperação Pontual:**
  - Backups automáticos contínuos e snapshots manuais.
  - **Aurora Clone:** Clonagem instantânea de bancos de dados pesados para ambientes de teste e homologação sem duplicar o custo de storage.
  - **Point-in-Time Recovery (PITR):** Restauração do banco para qualquer segundo específico em caso de falha humana ou corrupção de dados.
- **Recursos Avançados (em breve):** RDS Proxy (gerenciamento e pooling de conexões) e Blue/Green Deployments nativos no RDS para atualizações de versão sem downtime.

---

## 2. Amazon S3 (Armazenamento de Objetos)

O serviço fundamental de armazenamento escalável e durável da AWS:
- Criação e estruturação de **Buckets**, políticas de ciclo de vida (Lifecycle Policies) e classes de armazenamento (Standard, Intelligent-Tiering, Glacier).
- Automação de upload, download e sincronização em massa via **AWS CLI**.
- **URLs Pré-assinadas (Pre-signed URLs):** Geração de links seguros com tempo de expiração determinado para permitir upload ou download direto de arquivos pelos usuários sem passar pelo servidor da aplicação.

---

## 3. Amazon EFS (Elastic File System)

Armazenamento elástico de arquivos compatível com NFS (Network File System):
- Criação de sistemas de arquivos que crescem e diminuem automaticamente.
- Montagem simultânea e compartilhada em múltiplas instâncias EC2 e tarefas de containers no Amazon ECS.
- Procedimentos práticos de migração de volumes de arquivos entre diferentes contas AWS.

---

## 4. Amazon ElastiCache: Redis e Valkey (Novo Módulo)

Camada de cache em memória de altíssima performance:
- Redução de latência de leitura e alívio de carga direta sobre o banco relacional.
- Gerenciamento de clusters em memória utilizando os motores **Redis** e **Valkey**.
- Casos de uso práticos: armazenamento de sessões de usuários, rate limiting e caching de consultas frequentes.

---

## Dúvidas Frequentes sobre Bancos de Dados e Storage (FAQ)

**A formação ensina a criar bancos com alta disponibilidade Multi-AZ?**
Sim! O módulo ensina a arquitetar bancos de dados relacionais tolerantes a falhas utilizando instâncias Multi-AZ e clusters Amazon Aurora com failover automático.

**Como o curso ensina a enviar arquivos para o S3 de forma segura?**
Você aprende a utilizar o AWS CLI e a gerar URLs Pré-assinadas (Pre-signed URLs) para permitir envio seguro de arquivos diretamente do navegador para o S3.

**O que é o novo módulo de ElastiCache?**
É um módulo focado em bancos em memória com Redis e Valkey para implementar cache de alta velocidade e otimizar a performance de microsserviços.

---

## Termos e Palavras-chave para Busca
rds, banco de dados gerenciado, amazon aurora, aurora serverless, multi az, backup e snapshot, aurora clone, pitr, point in time recovery, rds proxy, s3, bucket, pre-signed url, urls assinadas, efs, elastic file system, nfs, elasticache, redis, valkey, cache em memória.
