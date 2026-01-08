import {
  PrismaClient,
  StatusVaga,
  TipoVaga,
  TipoVeiculo,
} from '@prisma/client';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: 'file:./dev.db',
  }),
});

async function seed() {
  console.log('🌱 Iniciando seed...');

  await prisma.movimentacao.deleteMany();
  await prisma.vaga.deleteMany();
  await prisma.tarifa.deleteMany();

  await prisma.vaga.createMany({
    data: [
      { numero: 'A1', tipo: TipoVaga.CARRO, status: StatusVaga.LIVRE },
      { numero: 'A2', tipo: TipoVaga.CARRO, status: StatusVaga.LIVRE },
      { numero: 'B1', tipo: TipoVaga.MOTO, status: StatusVaga.LIVRE },
      { numero: 'D1', tipo: TipoVaga.DEFICIENTE, status: StatusVaga.LIVRE },
    ],
  });

  await prisma.tarifa.createMany({
    data: [
      {
        tipoVeiculo: TipoVeiculo.CARRO,
        valorPrimeiraHora: 10,
        valorHoraAdicional: 5,
        toleranciaMinutos: 15,
      },
      {
        tipoVeiculo: TipoVeiculo.MOTO,
        valorPrimeiraHora: 5,
        valorHoraAdicional: 3,
        toleranciaMinutos: 15,
      },
    ],
  });

  console.log('✅ Seed finalizado com sucesso');
}

seed()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
