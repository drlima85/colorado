# Esteiras de CI/CD e Fundamentos de Git na Formação AWS

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Integração e Entrega Contínua (CI/CD), Ferramentas Nativas AWS e Versionamento com Git
- **Público:** Desenvolvedores, Engenheiros DevOps e Especialistas em Automação de Software

---

## 1. Pipelines de CI/CD na AWS com CodePipeline, CodeBuild e CodeDeploy

A esteira de deploy profissional é um dos pontos altos da Formação AWS, onde o aluno substitui de vez deploys manuais por uma pipeline 100% automatizada e integrada à aplicação modelo (Projeto BIA):

- **AWS CodePipeline:** Orquestrador visual e automatizado que conecta as fases de código (Source), compilação/testes (Build) e implantação em produção (Deploy).
- **AWS CodeBuild:** Serviço gerenciado de compilação e execução de testes em containers temporários.
  - Execução de baterias de testes automatizados e regras de proteção de branches (**Branch Protection**).
  - Execução segura de scripts de migração de schema de banco de dados (**Database Migrations**) antes de subir a nova versão.
  - **Integração com VPC:** Como rodar builds dentro da VPC privada para que os testes e migrações acessem bancos de dados protegidos no Amazon RDS.
  - **Injeção de Segredos:** Consumo seguro de variáveis protegidas armazenadas no AWS Secrets Manager e SSM Parameter Store.
- **AWS CodeDeploy:** Gerenciamento das estratégias de entrega contínua (Rolling Updates e Blue/Green Deployments) para containers ECS e instâncias EC2, com validação de tráfego e rollback automático imediato em caso de erro na nova versão.
- **Pipelines Especializadas:**
  - Pipelines de entrega contínua para funções **AWS Lambda**.
  - Pipelines automatizadas para execução de planos do **Terraform (em breve)**.

---

## 2. Git Essentials (Fundamentos de Versionamento)

Para os alunos que ainda não dominam ferramentas de controle de versão ou querem solidificar boas práticas de equipe:
- Criação e inicialização de repositórios locais (`git init`) e remotos (GitHub, GitLab, AWS CodeCommit).
- Ciclo de trabalho essencial: `git add`, `git commit`, `git push`, `git pull` e `git clone`.
- Boas práticas com `.gitignore` para nunca cometer credenciais, arquivos de ambiente (`.env`) ou dependências no repositório.
- Trabalho com branches, abertura de **Pull Requests (PR)** e resolução de conflitos de merge.
- Uso de `git stash` para guardar alterações temporárias e comandos de recuperação como `git revert` e `git reset`.

---

## Dúvidas Frequentes sobre CI/CD e Git na Formação AWS (FAQ)

**A Formação AWS ensina a automatizar o deploy da aplicação?**
Sim! Você constrói uma pipeline profissional completa com AWS CodePipeline, CodeBuild e CodeDeploy para que cada commit ou Pull Request aprovado seja testado e publicado automaticamente na AWS.

**Como o pipeline roda testes e migrações de banco sem expor o RDS na internet?**
É ensinado a configurar o AWS CodeBuild integrado diretamente dentro da VPC privada, permitindo que o container de build se comunique com o banco RDS de forma 100% interna e segura.

**Se eu nunca usei Git, vou ficar perdido?**
Não. O módulo Git Essentials ensina passo a passo os comandos de versionamento essenciais para você clonar repositórios, versionar seus códigos e trabalhar com branches.

---

## Termos e Palavras-chave para Busca
ci cd na aws, codepipeline, codebuild, codedeploy, esteira de deploy, integração contínua, entrega contínua, pull request, push, testes automatizados, migrations de banco, pipeline vpc, segredos no pipeline, git, git essentials, git commit push clone, git stash, branch protection.
