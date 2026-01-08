# PARKIA – Plataforma de Estacionamentos Inteligentes

## Objetivo
Construir um sistema de Gestão de Vagas de Estacionamento com regras de negócio realistas, incluindo controle de ocupação, histórico de movimentações e validações de entrada/saída.

## Tecnologias Utilizadas
- **Backend**: NestJS (TypeScript)
- **Banco de Dados**: SQLite (via Prisma ORM)
- **Gerenciamento de Pacotes**: npm

## Requisitos do Sistema

### Banco de Dados
O sistema utiliza as seguintes tabelas principais:
- **vagas**: Armazena as vagas com número único, status (livre/ocupada/manutencao) e tipo.
- **movimentacoes**: Registra entradas e saídas, vinculando vaga e veículo, com cálculo de valor.
- **tarifas**: Define valores por tipo de veículo (primeira hora, hora adicional, tolerância).

### Regras de Negócio Implementadas
- **Entrada de Veículo**:
  - Validação se a vaga está livre.
  - Bloqueio de ocupação em vagas em manutenção.
  - Validação de compatibilidade (Moto pode usar vaga de Carro, mas Carro não usa vaga de Moto).
- **Saída de Veículo**:
  - Cálculo de permanência e valor a pagar.
  - Aplicação de tolerância (padrão 15 minutos grátis).
  - Liberação automática da vaga após saída.
- **Gestão de Vagas**:
  - Validação de formato do número da vaga (ex: A1, B2).
  - Impedimento de exclusão de vagas ocupadas.

## Instalação e Execução

### 1. Instalar Dependências
Certifique-se de ter o Node.js instalado. Na raiz do projeto, execute:

```bash
npm install

2. Configurar e Rodar o Banco de Dados
O projeto utiliza SQLite para simplificar a configuração local.

Gere as migrações e o arquivo do banco de dados (dev.db):

Popule o banco com dados iniciais (Seed de vagas e tarifas):

npm run seed
# ou
npx prisma db seed

3. Executar a API
Para iniciar o servidor em modo de desenvolvimento:

npm run start:dev

A API estará rodando em: http://localhost:3000

4. Acessar o Frontend
O backend está configurado (CORS) para aceitar requisições da origem http://localhost:5173. Certifique-se de que sua aplicação frontend (React/Lovable) esteja rodando nesta porta.

Documentação da API (Endpoints)
Vagas
GET /vagas: Listar todas as vagas.
Filtros (Query params): ?status=LIVRE&tipo=CARRO
POST /vagas: Criar uma nova vaga.
Body: { "numero": "A1", "tipo": "CARRO" }
PUT /vagas/:id: Atualizar dados da vaga.
DELETE /vagas/:id: Excluir vaga (apenas se estiver livre).
GET /vagas/estatisticas: Retorna total de vagas, ocupadas, livres e percentual de ocupação.
Movimentações
POST /movimentacoes/entrada: Registrar entrada.
Body: { "placa": "ABC-1234", "vagaId": "uuid...", "tipoVeiculo": "CARRO" }
POST /movimentacoes/saida: Registrar saída.
Body: { "placa": "ABC-1234" }
GET /movimentacoes: Listar veículos atualmente no pátio.
GET /movimentacoes/historico: Histórico de movimentações.
Filtros (Query params): ?inicio=2023-01-01&fim=2023-12-31
Tarifas
GET /tarifas: Listar tarifas configuradas.
PUT /tarifas/:id: Atualizar valores de uma tarifa.
Testes
Para executar os testes automatizados dos principais fluxos:

npm run test

Decisões Técnicas
SQLite: Escolhido pela simplicidade de configuração e portabilidade para o ambiente de desenvolvimento e avaliação.
Prisma ORM: Utilizado para facilitar a modelagem de dados, migrações e type-safety no acesso ao banco.
NestJS: Framework escolhido para garantir arquitetura modular, injeção de dependência e fácil escalabilidade.


