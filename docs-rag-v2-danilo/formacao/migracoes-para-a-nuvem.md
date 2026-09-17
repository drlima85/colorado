# Migrações Práticas para a Nuvem na Formação AWS: Casos Reais em Múltiplas Stacks

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Projetos de Migração Real de Aplicações Monolíticas e Microsserviços para a Nuvem AWS
- **Público:** Engenheiros de Migração, Arquitetos de Nuvem, Desenvolvedores e Consultores Cloud

---

## Como Funcionam os Projetos Práticos de Migração

Um dos maiores desafios enfrentados por profissionais nas empresas não é criar projetos novos do zero ("greenfield"), mas sim **pegar sistemas legados existentes, rodando em servidores locais ou VPS tradicionais, e migrá-los com segurança para a AWS ("brownfield")** sem perda de dados e com o menor downtime possível.

Na Formação AWS 5.0, o aluno não fica apenas na teoria dos "6 Rs de Migração" (Rehost, Replatform, Refactor, etc.): ele executa a migração real de aplicações completas construídas nas stacks mais demandadas pelo mercado:

---

## As Aplicações e Tecnologias Migradas no Curso

1. **Projeto em Ruby on Rails:**
   - Containerização da aplicação Rails e compilação de assets.
   - Migração do banco relacional para Amazon RDS PostgreSQL.
   - Configuração de workers de background e deploy escalável no Amazon ECS.

2. **Projeto em Python com Framework Django:**
   - Adaptação de configurações para leitura de variáveis seguras do ambiente.
   - Separação de arquivos estáticos e upload de mídia de usuários diretamente para o Amazon S3 com CloudFront.
   - Conexão segura a banco de dados gerenciado e deploy automatizado.

3. **Projeto em Microsoft .NET Core:**
   - Migração de aplicações corporativas modernas em C# / .NET.
   - Conexão e integração com **Microsoft SQL Server** no Amazon RDS e Docker na AWS.
   - Implantação em containers Linux de alta densidade e baixo custo de licenciamento.

4. **Projeto em Node.js com Frontend React (2 Versões Diferentes):**
   - **Versão em Containers:** Backend e frontend desacoplados rodando no Amazon ECS com Load Balancer e Service Discovery.
   - **Versão Serverless:** Frontend hospedado em bucket S3 com CloudFront CDN e backend refatorado para microsserviços AWS Lambda e API Gateway.

5. **Projeto em PHP com WordPress (Alta Disponibilidade):**
   - Migração completa de site e banco de dados WordPress.
   - Desacoplamento da camada de arquivos com Amazon EFS compartilhado e Amazon S3 para uploads.
   - Separação de banco no Amazon Aurora/RDS MySQL e balanceamento entre múltiplas zonas de disponibilidade.

---

## Dúvidas Frequentes sobre Migrações (FAQ)

**A Formação AWS ensina a migrar aplicações reais de empresas?**
Sim! Você migra aplicações completas em 5 linguagens e tecnologias diferentes (Ruby on Rails, Python Django, .NET Core, Node.js/React e PHP WordPress) para a AWS.

**Como é tratada a migração de arquivos de upload nessas aplicações?**
Você aprende a desacoplar o armazenamento local dos servidores, enviando uploads e arquivos estáticos para o Amazon S3 e montando pastas compartilhadas via Amazon EFS quando necessário.

**Consigo aplicar essas técnicas para migrar sistemas da minha empresa?**
Com certeza. As aulas cobrem desde o planejamento da arquitetura e containerização até a transição de tráfego com Load Balancers e gerenciamento de banco de dados na nuvem.

---

## Termos e Palavras-chave para Busca
migração para nuvem, migração aws, migrar ruby on rails aws, migrar django python aws, migrar net core c# aws, migrar node react aws, migrar wordpress alta disponibilidade aws, 6 rs migração, migração de banco de dados rds, projetos práticos de migração.
