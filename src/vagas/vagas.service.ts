import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, StatusVaga, TipoVaga } from '@prisma/client';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';

@Injectable()
export class VagasService {
  constructor(private prisma: PrismaService) {}

  findAll(status?: StatusVaga, tipo?: TipoVaga) {
    return this.prisma.vaga.findMany({
      where: {
        status,
        tipo,
      },
      orderBy: { numero: 'asc' },
    });
  }

  async create(dto: CreateVagaDto) {
    if (!/^[A-Z]+[0-9]+$/.test(dto.numero)) {
      throw new BadRequestException(
        'O número da vaga deve ser composto por letras maiúsculas seguidas de números (ex: A1, B2)',
      );
    }

    try {
      return await this.prisma.vaga.create({
        data: {
          numero: dto.numero,
          tipo: dto.tipo,
          status: StatusVaga.LIVRE,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Já existe uma vaga registrada com este número',
        );
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateVagaDto) {
    if (dto.numero && !/^[A-Z]+[0-9]+$/.test(dto.numero)) {
      throw new BadRequestException(
        'O número da vaga deve ser composto por letras maiúsculas seguidas de números (ex: A1, B2)',
      );
    }

    try {
      return await this.prisma.vaga.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Já existe uma vaga registrada com este número',
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    const vaga = await this.prisma.vaga.findUnique({ where: { id } });

    if (!vaga) throw new BadRequestException('Vaga não encontrada');
    if (vaga.status !== StatusVaga.LIVRE) {
      throw new BadRequestException(
        'A vaga não pode ser excluída pois não está livre',
      );
    }

    return this.prisma.vaga.delete({ where: { id } });
  }

  async estatisticas() {
    const [total, ocupadas, livres, manutencao] = await Promise.all([
      this.prisma.vaga.count(),
      this.prisma.vaga.count({ where: { status: StatusVaga.OCUPADA } }),
      this.prisma.vaga.count({ where: { status: StatusVaga.LIVRE } }),
      this.prisma.vaga.count({ where: { status: StatusVaga.MANUTENCAO } }),
    ]);

    const totalAtivas = total - manutencao;

    return {
      total,
      ocupadas,
      livres,
      manutencao,
      percentualOcupacao: totalAtivas
        ? Number(((ocupadas / totalAtivas) * 100).toFixed(2))
        : 0,
    };
  }
}
