# Redes, DNS e Distribuição Global na Formação AWS: VPC, Route 53 e CloudFront

**Contexto do Documento:**
- **Produto:** Lab formacao AWS Danilo com Henrille Maia
- **Módulo Técnico:** Arquitetura de Redes Privadas (VPC), Resolução de Nomes (Route 53) e Rede de Distribuição de Conteúdo (CloudFront CDN)
- **Público:** Engenheiros de Nuvem, Administradores de Redes, Arquitetos de Soluções e DevOps

---

## 1. Amazon VPC (Virtual Private Cloud) e Segurança de Rede

A camada de rede é a espinha dorsal de qualquer arquitetura corporativa na AWS. O módulo cobre a criação e isolamento de redes do zero aos padrões empresariais:
- **Criação e Topologia de VPC:** Desenho de blocos CIDR, segmentação de rede entre **Subnets Públicas** (com saída direta para a internet via Internet Gateway) e **Subnets Privadas** (para bancos de dados e aplicações protegidas).
- **Tabelas de Roteamento (Route Tables):** Definição precisa de rotas locais, rotas para o Internet Gateway e rotas internas.
- **Conectividade Segura com NAT Gateway:** Como permitir que instâncias e containers em subnets privadas acessem a internet para baixar atualizações e pacotes sem ficarem expostos a conexões externas.
- **VPC Peering:** Interconexão direta entre diferentes VPCs na mesma conta ou em contas separadas para comunicação segura.
- **VPC Endpoints (PrivateLink):**
  - **Gateway Endpoints:** Comunicação interna e sem custo de transferência de dados com serviços como **Amazon S3** e **DynamoDB**.
  - **Interface Endpoints (VPC Endpoints):** Conexão privada aos serviços gerenciados da AWS (ECR, SSM, Secrets Manager, CloudWatch) sem passar pela internet pública.
- **Transit Gateway Hub and Spoke (em breve):** Arquitetura centralizada de interconexão corporativa para conectar dezenas de VPCs e redes on-premises.

---

## 2. Amazon Route 53 (DNS Gerenciado e Alta Disponibilidade)

O serviço de DNS altamente disponível e escalável da nuvem:
- **Hosted Zones Públicas e Privadas:** Registro, delegação de domínio e resolução interna de nomes dentro da VPC.
- **Tipos de Registros DNS:** Criação de registros A, CNAME, TXT, MX e **Registros de Alias** otimizados para apontar diretamente para recursos da AWS (como Application Load Balancers e distribuições do CloudFront) com suporte a roteamento Apex.
- **Integrações de Roteamento:** Políticas de roteamento e integração com balanceadores e CDNs.

---

## 3. Amazon CloudFront (CDN Global e Cache de Borda)

Aceleração de aplicações dinâmicas e estáticas com presença mundial:
- **Origens e Comportamentos (Origins & Behaviors):** Distribuição de tráfego com múltiplos backends (roteando rotas `/api/*` para o Application Load Balancer e arquivos estáticos para o Amazon S3).
- **Políticas de Cache (Cache Policies):** Otimização do tempo de resposta (latência de milissegundos), compressão automática (Gzip e Brotli) e regras de invalidação de cache.
- **Origin Access Control (OAC) e OAI:** Proteção avançada de buckets S3, garantindo que os dados estáticos só possam ser acessados através da CDN do CloudFront e nunca diretamente pelo link do S3.
- **CloudFront Functions:** Manipulação de requisições na borda (Edge Computing) com ultra-baixa latência para redirecionamentos, normalização de cabeçalhos e autenticação rápida.
- **VPC Origin:** Entrega de conteúdo originado diretamente de recursos em subnets privadas através da CDN.
- **Continuous Deployment no CloudFront (em breve):** Implantações progressivas e testes do tipo Blue/Green ou Canary direto na CDN.

---

## Dúvidas Frequentes sobre Redes e CDN (FAQ)

**A Formação AWS ensina a criar VPC do zero com subnets privadas e públicas?**
Sim! Você aprende a arquitetar do zero a topologia completa de redes recomendada pelo AWS Well-Architected Framework, incluindo NAT Gateway e VPC Endpoints.

**O que é abordado sobre CloudFront?**
São ensinadas configurações avançadas de múltiplos Origins (S3 e Load Balancer), controle de cache, manipulação de tráfego com CloudFront Functions e proteção de buckets com Origin Access Control (OAC).

**É ensinado como registrar domínios e gerenciar DNS no Route 53?**
Sim, você aprende a criar Zonas Hospedadas e apontar domínios próprios para balanceadores e distribuições CloudFront utilizando registros de Alias.

---

## Termos e Palavras-chave para Busca
vpc, redes na aws, subnets públicas e privadas, route table, internet gateway, nat gateway, vpc peering, vpc endpoints, privatelink, gateway endpoint, route 53, dns, hosted zone, alias record, cloudfront, cdn, cache de borda, oac, origin access control, cloudfront functions, vpc origin.
