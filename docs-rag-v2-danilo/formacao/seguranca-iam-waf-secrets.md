# Segurança, Identidade e Proteção na Formação AWS: IAM, WAF, ACM e Secrets Manager

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Gestão de Identidades (IAM), Proteção de Aplicações Web (AWS WAF), Certificados SSL/TLS (ACM) e Gerenciamento de Segredos
- **Público:** Profissionais de Segurança da Informação (SecOps), Engenheiros DevOps, SysAdmins e Desenvolvedores

---

## 1. AWS WAF (Web Application Firewall): Ataque e Defesa na Prática

Uma das aulas mais elogiadas da formação aborda a segurança a partir de um cenário prático e visceral:
- **Simulação Real de Ataque:** O professor executa ferramentas de ataque contra uma aplicação real na nuvem, simulando injeção de SQL (SQL Injection), Cross-Site Scripting (XSS) e ataques de negação de serviço (DDoS / flood de requisições), derrubando a aplicação ao vivo.
- **Configuração de Defesa:** O aluno aprende a implementar o **AWS WAF** integrado ao Application Load Balancer e ao CloudFront.
- **Criação de Web ACLs e Regras:** Aplicação de Managed Rule Groups da AWS, rate limiting por IP para conter abusos e bloqueio automático de tráfego malicioso em tempo real, restabelecendo e blindando a aplicação.

---

## 2. AWS Certificate Manager (ACM): Criptografia SSL/TLS

Implementação de HTTPS e criptografia em trânsito de ponta a ponta:
- Emissão de certificados digitais públicos e gratuitos gerenciados pela AWS com renovação automática.
- Validação rápida de domínio via registros DNS no Amazon Route 53.
- Associação de certificados SSL/TLS em **Application Load Balancers (ALB)** e distribuições do **Amazon CloudFront**.

---

## 3. AWS IAM (Identity and Access Management) e Governança

O núcleo de controle de acesso e princípio do menor privilégio na AWS:
- **Estrutura de Acessos:** Gerenciamento de **Users** (usuários humanos), **Groups** (grupos de permissões), **Policies** (políticas em JSON gerenciadas e inline) e **Roles** (papéis assumíveis por serviços).
- **Segurança de Contas:** Obrigatoriedade de **MFA (Multi-Factor Authentication)**, políticas de complexidade de senhas e auditoria de credenciais.
- **Estrutura de ARNs (Amazon Resource Names):** Como referenciar com precisão qualquer recurso dentro de políticas de autorização.
- **Roles para Serviços:** Como permitir que instâncias EC2, tarefas do ECS ou funções Lambda acessem buckets S3 ou bancos de dados de forma segura sem chaves de acesso estáticas no código.
- **IAM Identity Center (antigo AWS SSO):** Centralização de identidades para empresas e equipes com múltiplos usuários e contas.

---

## 4. AWS Secrets Manager e SSM Parameter Store

Armazenamento seguro de segredos e configurações corporativas:
- **AWS Secrets Manager:** Armazenamento seguro e criptografado de senhas de banco de dados, chaves de API e tokens de autenticação externos. Rotação automática de senhas integrada com o Amazon RDS e consumo seguro no projeto BIA.
- **AWS Systems Manager Parameter Store:** Gerenciamento centralizado de parâmetros de configuração em texto plano e strings criptografadas (SecureString) com controle de versão.

---

## Dúvidas Frequentes sobre Segurança na Formação AWS (FAQ)

**Como o curso ensina AWS WAF?**
O curso utiliza uma abordagem prática de ataque e defesa: primeiro é demonstrado um ataque real derrubando uma aplicação desprotegida, e em seguida é configurado o AWS WAF para bloquear as requisições maliciosas e proteger o ambiente.

**É ensinado como colocar HTTPS na aplicação?**
Sim! Você aprende a emitir certificados SSL/TLS gratuitos com o AWS Certificate Manager (ACM) e associá-los ao Load Balancer e à CDN CloudFront.

**Como evitar colocar senhas de banco de dados no código-fonte?**
O módulo ensina a integrar a aplicação com o AWS Secrets Manager e o SSM Parameter Store, injetando as credenciais em tempo de execução de forma 100% segura.

---

## Termos e Palavras-chave para Busca
segurança na aws, aws waf, web application firewall, derrubar aplicação, ataque e defesa, ddos, sql injection, acm, certificate manager, certificado ssl, https gratuito, iam, roles, policies, users, groups, mfa, iam identity center, secrets manager, ssm parameter store, credenciais seguras.
