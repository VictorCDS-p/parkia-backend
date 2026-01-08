import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EntradaMovimentacaoDto } from './dto/entrada-movimentacao.dto';
import { StatusVaga, TipoVaga, TipoVeiculo } from '@prisma/client';

@Injectable()
export class MovimentacoesService {
  constructor(private prisma: PrismaService) {}

  async registrarEntrada(dto: EntradaMovimentacaoDto) {
    const { vagaId, placa, tipoVeiculo } = dto;

    return this.prisma.$transaction(async (tx) => {
      const vaga = await tx.vaga.findUnique({ where: { id: vagaId } });

      if (!vaga) throw new BadRequestException('Vaga não encontrada');
      if (vaga.status !== StatusVaga.LIVRE)
        throw new BadRequestException('Vaga indisponível');

      if (tipoVeiculo === TipoVeiculo.CARRO && vaga.tipo === TipoVaga.MOTO) {
        throw new BadRequestException('Carro não pode ocupar vaga de moto');
      }

      const jaEstacionado = await tx.movimentacao.findFirst({
        where: { placa, saida: null },
      });

      if (jaEstacionado) {
        throw new BadRequestException('Veículo já está no estacionamento');
      }

      const movimentacao = await tx.movimentacao.create({
        data: { placa, tipoVeiculo, vagaId },
      });

      await tx.vaga.update({
        where: { id: vagaId },
        data: { status: StatusVaga.OCUPADA },
      });

      return movimentacao;
    });
  }

  async registrarSaida(placa: string) {
    const mov = await this.prisma.movimentacao.findFirst({
      where: { placa, saida: null },
      include: { vaga: true },
    });

    if (!mov) throw new BadRequestException('Veículo não encontrado');

    const tarifa = await this.prisma.tarifa.findFirst({
      where: { tipoVeiculo: mov.tipoVeiculo },
    });

    if (!tarifa) throw new BadRequestException('Tarifa não cadastrada');

    const agora = new Date();
    const minutos = Math.ceil(
      (agora.getTime() - mov.entrada.getTime()) / 60000,
    );

    let valor = 0;
    if (minutos > tarifa.toleranciaMinutos) {
      const horas = Math.ceil(minutos / 60);
      valor =
        tarifa.valorPrimeiraHora +
        Math.max(0, horas - 1) * tarifa.valorHoraAdicional;
    }

    await this.prisma.vaga.update({
      where: { id: mov.vagaId },
      data: { status: StatusVaga.LIVRE },
    });

    return this.prisma.movimentacao.update({
      where: { id: mov.id },
      data: { saida: agora, valorPago: valor },
    });
  }

  findAtivas() {
    return this.prisma.movimentacao.findMany({
      where: { saida: null },
      include: { vaga: true },
    });
  }

  findHistorico(inicio?: string, fim?: string) {
    return this.prisma.movimentacao.findMany({
      where: {
        entrada: {
          gte: inicio ? new Date(inicio) : undefined,
          lte: fim ? new Date(fim) : undefined,
        },
      },
      orderBy: { entrada: 'desc' },
    });
  }
}
