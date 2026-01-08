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

### 2️⃣ Configurar e Rodar o Banco de Dados

```bash
npx prisma migrate dev
```

Popule com dados iniciais:

```bash
npm run seed
# ou
npx prisma db seed
```

### 3️⃣ Executar a API

```bash
npm run start:dev
```

API disponível: [http://localhost:3000](http://localhost:3000)

### 4️⃣ Acessar o Frontend

O backend aceita requisições da origem [http://localhost:5173](http://localhost:5173).
Certifique-se de que o frontend (React/Lovable) esteja rodando nesta porta.

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
  "status": "LIVRE"
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

---

## ✅ Testes Automatizados

```bash
npm run test
```

---

## 🛠 Decisões Técnicas

* **SQLite**: Simples de configurar e portátil
* **Prisma ORM**: Facilita modelagem, migrações e type-safety
* **NestJS**: Framework modular, escalável e com injeção de dependência

---
