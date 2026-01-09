# PARKIA – Backend

[![NestJS](https://img.shields.io/badge/NestJS-Framework-red)](https://nestjs.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/) [![SQLite](https://img.shields.io/badge/SQLite-DB-blue)](https://www.sqlite.org/)

---

## 🎯 Objetivo

O **PARKIA** é um sistema de Gestão de Vagas de Estacionamento que implementa regras de negócio realistas:

* Controle de ocupação das vagas
* Histórico completo de movimentações
* Validações de entrada/saída de veículos

---

## 🛠 Tecnologias Utilizadas

* **Backend**: NestJS (TypeScript)
* **Banco de Dados**: SQLite (via Prisma ORM)
* **Gerenciamento de Pacotes**: npm

---

## 🗂 Requisitos do Sistema

### Banco de Dados

Tabelas principais:

| Tabela          | Descrição                                                                       |
| --------------- | ------------------------------------------------------------------------------- |
| `vagas`         | Número único, status (`LIVRE`, `OCUPADA`, `MANUTENCAO`), tipo (`CARRO`, `MOTO`) |
| `movimentacoes` | Entradas e saídas, vinculando a vaga e cálculo de valor                         |
| `tarifas`       | Valores por tipo de veículo: primeira hora, hora adicional, tolerância          |

### Regras de Negócio

**Entrada de Veículo**

* Valida se a vaga está livre
* Bloqueia vagas em manutenção
* Moto pode usar vaga de Carro, mas Carro não pode usar vaga de Moto

**Saída de Veículo**

* Calcula permanência e valor a pagar
* Aplica tolerância de 15 minutos (tempo grátis)
* Libera automaticamente a vaga após saída

**Gestão de Vagas**

* Valida formato do número da vaga (ex: `A1`, `B2`)
* Impede exclusão de vagas ocupadas

---

## ⚡ Instalação e Execução

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Gerar Prisma Client

```bash
npx prisma generate
```

> Garante que os tipos do TypeScript (PrismaClient e enums) estejam disponíveis.

### 3️⃣ Criar e Migrar o Banco de Dados

```bash
npx prisma migrate dev
```

> Cria o arquivo `dev.db` e aplica as tabelas definidas no schema.

### 4️⃣ Rodar Seed (Popular Dados Iniciais)

```bash
npx prisma db seed
# ou
npm run seed
```

> Insere vagas e tarifas iniciais no banco.

### 5️⃣ Executar a API Localmente

```bash
npm run start:dev
```

API disponível: [http://localhost:3000](http://localhost:3000)

### 6️⃣ Acessar o Frontend

O backend aceita requisições da origem [http://localhost:5173](http://localhost:5173).
Certifique-se de que o frontend esteja rodando nesta porta.

---

## 📡 Documentação da API (Endpoints)

### Vagas

**Listar todas as vagas**

```http
GET /vagas
```

Query params opcionais:

```
?status=LIVRE&tipo=CARRO
```

**Criar nova vaga**

```http
POST /vagas
```

```json
{
  "numero": "A1",
  "tipo": "CARRO"
}
```

**Atualizar vaga**

```http
PUT /vagas/:id
```

```json
{
  "numero": "B2",
  "tipo": "MOTO",
}
```

**Excluir vaga (apenas se livre)**

```http
DELETE /vagas/:id
```

**Estatísticas de vagas**

```http
GET /vagas/estatisticas
```

---

### Movimentações

**Registrar entrada**

```http
POST /movimentacoes/entrada
```

```json
{
  "placa": "ABC-1234",
  "vagaId": "uuid-da-vaga",
  "tipoVeiculo": "CARRO"
}
```

**Registrar saída**

```http
POST /movimentacoes/saida
```

```json
{
  "placa": "ABC-1234"
}
```

**Listar veículos no pátio**

```http
GET /movimentacoes
```

**Histórico de movimentações**

```http
GET /movimentacoes/historico
```

Query params opcionais:

```
?inicio=2023-01-01&fim=2023-12-31
```

---

### Tarifas

**Listar tarifas**

```http
GET /tarifas
```

**Atualizar tarifa**

```http
PUT /tarifas/:id
```

```json
{
  "tipoVeiculo": "CARRO",
  "primeiraHora": 5.00,
  "horaAdicional": 3.00,
  "toleranciaMinutos": 15
}
```
## 🔗 Configuração da API (Backend)

Por padrão, o frontend consome a API local em `http://localhost:3000`.
Caso queira utilizar a API hospedada em produção, é necessário ajustar o arquivo de configuração do cliente HTTP.

### API em Produção (Render)

* **API hospedada (Render):**
  👉 [https://parkia-backend.onrender.com](https://parkia-backend.onrender.com)

### Como configurar

1. Acesse o arquivo do client de API:

```ts
src/api/client.ts
```

2. Altere a `baseURL` para o endereço da API em produção:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://parkia-backend.onrender.com",
});
```

3. Salve o arquivo e reinicie o frontend:

```bash
npm run dev
# ou
yarn dev
```

A partir desse momento, o frontend passará a consumir a API hospedada no Render.
---

## 🛠 Decisões Técnicas

* **SQLite**: Simples de configurar e portátil
* **Prisma ORM**: Facilita modelagem, migrações e type-safety
* **NestJS**: Framework modular, escalável e com injeção de dependência

---

## 🌐 Links Úteis

* **API hospedada (Render):** [https://parkia-backend.onrender.com](https://parkia-backend.onrender.com)
* **Frontend do Parkia (Vercel):** [https://parkia-frontend.vercel.app](https://parkia-frontend.vercel.app)
* **Repositório do Frontend:** [Link do Frontend](https://github.com/VictorCDS-p/parkia-frontend)
---
