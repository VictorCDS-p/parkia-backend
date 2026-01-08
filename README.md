# PARKIA – Plataforma de Estacionamentos Inteligentes

## Objetivo

O **PARKIA** é um sistema de Gestão de Vagas de Estacionamento que implementa regras de negócio realistas, incluindo controle de ocupação, histórico de movimentações e validações de entrada/saída de veículos.

## Tecnologias Utilizadas

* **Backend**: NestJS (TypeScript)
* **Banco de Dados**: SQLite (via Prisma ORM)
* **Gerenciamento de Pacotes**: npm

## Requisitos do Sistema

### Banco de Dados

O sistema utiliza as seguintes tabelas principais:

* **vagas**: Armazena as vagas com número único, status (`LIVRE`, `OCUPADA`, `MANUTENCAO`) e tipo (`CARRO`, `MOTO`).
* **movimentacoes**: Registra entradas e saídas de veículos, vinculando a vaga e calculando o valor a pagar.
* **tarifas**: Define valores por tipo de veículo (primeira hora, hora adicional e tolerância).

### Regras de Negócio Implementadas

#### Entrada de Veículo

* Valida se a vaga está livre.
* Bloqueia ocupação de vagas em manutenção.
* Valida compatibilidade: Moto pode usar vaga de Carro, mas Carro não pode usar vaga de Moto.

#### Saída de Veículo

* Calcula o tempo de permanência e o valor a pagar.
* Aplica tolerância de 15 minutos por padrão (tempo grátis).
* Libera automaticamente a vaga após a saída do veículo.

#### Gestão de Vagas

* Valida o formato do número da vaga (ex: `A1`, `B2`).
* Impede a exclusão de vagas ocupadas.

## Instalação e Execução

### 1. Instalar Dependências

Certifique-se de ter o Node.js instalado. Na raiz do projeto, execute:

```bash
npm install
```

### 2. Configurar e Rodar o Banco de Dados

O projeto utiliza SQLite para simplificar a configuração local.

Gere as migrações e o banco de dados:

```bash
npx prisma migrate dev
```

Popule o banco com dados iniciais (seed de vagas e tarifas):

```bash
npm run seed
# ou
npx prisma db seed
```

### 3. Executar a API

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

### 4. Acessar o Frontend

O backend está configurado com **CORS** para aceitar requisições da origem [http://localhost:5173](http://localhost:5173).
Certifique-se de que sua aplicação frontend (React/Lovable) esteja rodando nesta porta.

---

## Documentação da API (Endpoints)

### Vagas

* `GET /vagas` – Listar todas as vagas

  * Filtros (Query params): `?status=LIVRE&tipo=CARRO`
* `POST /vagas` – Criar uma nova vaga

  * Body: `{ "numero": "A1", "tipo": "CARRO" }`
* `PUT /vagas/:id` – Atualizar dados da vaga
* `DELETE /vagas/:id` – Excluir vaga (apenas se estiver livre)
* `GET /vagas/estatisticas` – Retorna total de vagas, ocupadas, livres e percentual de ocupação

### Movimentações

* `POST /movimentacoes/entrada` – Registrar entrada de veículo

  * Body: `{ "placa": "ABC-1234", "vagaId": "uuid...", "tipoVeiculo": "CARRO" }`
* `POST /movimentacoes/saida` – Registrar saída de veículo

  * Body: `{ "placa": "ABC-1234" }`
* `GET /movimentacoes` – Listar veículos atualmente no pátio
* `GET /movimentacoes/historico` – Histórico de movimentações

  * Filtros (Query params): `?inicio=2023-01-01&fim=2023-12-31`

### Tarifas

* `GET /tarifas` – Listar tarifas configuradas
* `PUT /tarifas/:id` – Atualizar valores de uma tarifa

---

## Testes

Para executar os testes automatizados dos principais fluxos:

```bash
npm run test
```

---

## Decisões Técnicas

* **SQLite**: Escolhido pela simplicidade de configuração e portabilidade para desenvolvimento.
* **Prisma ORM**: Facilita modelagem de dados, migrações e garante type-safety.
* **NestJS**: Framework modular, com injeção de dependência e fácil escalabilidade.

---

Quer que eu faça isso?
