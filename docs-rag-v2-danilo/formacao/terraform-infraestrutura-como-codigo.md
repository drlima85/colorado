# Terraform e Infraestrutura como Código (IaC) na Formação AWS

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Infraestrutura como Código (IaC), HashiCorp Terraform e Automação de Ambientes
- **Público:** Engenheiros DevOps, SysAdmins, Desenvolvedores e Arquitetos de Nuvem

---

## A Formação AWS ensina Terraform?

**SIM, a Formação AWS 5.0 ensina Terraform de ponta a ponta.** 

O tema é abordado através da metodologia prática de **Infraestrutura como Código (IaC)** aplicada diretamente ao projeto **BIA**: em vez de clicar no console da AWS para criar servidores, redes e bancos de dados manualmente, o aluno escreve código declarativo em HCL (HashiCorp Configuration Language) para provisionar, atualizar e destruir toda a arquitetura de forma automatizada, reproduzível e versionada.

---

## Conteúdo do Módulo "BIA Terraform"

O módulo é focado em boas práticas de mercado e cobre os conceitos essenciais e avançados da ferramenta:

1. **Estruturação de Código em HCL:**
   - **Resources:** Declaração de recursos da AWS (VPC, Subnets, Security Groups, instâncias EC2, clusters ECS, repositórios ECR e bancos RDS).
   - **Variables e Outputs:** Parametrização dinâmica de ambientes (dev, staging, prod) e exportação de valores importantes (como DNS de Load Balancers e endpoints de bancos).
   - **Locals e Data Sources:** Simplificação de lógica interna e consulta a recursos já existentes na conta AWS sem precisar recriá-los.

2. **Ciclo de Vida e Operações com Terraform:**
   - `terraform init`, `terraform plan`, `terraform apply` e `terraform destroy`.
   - Gerenciamento seguro do arquivo de estado (**tfstate**) e boas práticas para evitar conflitos de concorrência.

3. **Importação de Recursos Legados:**
   - **terraform import:** Como trazer recursos criados manualmente no console para dentro do gerenciamento de código do Terraform (utilizando a linha de comando e os modernos blocos declarativos `import {}`).

4. **Projeto Prático: BIA com Terraform:**
   - Subindo todo o ambiente de trabalho e dependências da BIA via código.
   - Provisionamento automatizado do cluster **Amazon ECS**, Task Definitions e Services da BIA 100% gerenciados por Terraform.

5. **Evolução da Grade (Em breve):**
   - **Pipelines com Terraform:** Execução automatizada de planos e validações de Terraform integrados à esteira de CI/CD da AWS.

---

## Dúvidas Frequentes sobre Terraform na Formação (FAQ)

**Vou aprender Terraform no curso?**
Sim! A Formação AWS possui um módulo dedicado chamado "BIA Terraform", onde você aprende a codificar a infraestrutura da AWS em HCL e provisionar os serviços via código.

**O curso ensina a importar recursos que já existem na AWS para o Terraform?**
Sim, você aprende a utilizar o comando `terraform import` e a sintaxe moderna de blocos de importação para colocar recursos existentes sob controle de versão.

**Qual a vantagem de usar Terraform em vez de criar tudo pelo console?**
Com Terraform sua infraestrutura vira código: você pode recriar todo o ambiente em minutos, testar mudanças com segurança através do `plan`, versionar no Git e evitar erros humanos no console da AWS.

---

## Termos e Palavras-chave para Busca
terraform, iac, infraestrutura como código, terraform na aws, hcl, hashycorp terraform, terraform apply plan destroy, tfstate, terraform import, variáveis terraform, outputs, data sources, bia terraform, ecs com terraform, automação de infraestrutura.
