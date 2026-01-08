import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VagasModule } from './vagas/vagas.module';
import { MovimentacoesModule } from './movimentacoes/movimentacoes.module';
import { TarifasModule } from './tarifas/tarifas.module';

@Module({
  imports: [PrismaModule, VagasModule, MovimentacoesModule, TarifasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
