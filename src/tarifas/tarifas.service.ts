import { Injectable } from '@nestjs/common';
import { Prisma, Tarifa } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TarifasService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Tarifa[]> {
    return this.prisma.tarifa.findMany();
  }

  async update(id: string, data: Prisma.TarifaUpdateInput): Promise<Tarifa> {
    return this.prisma.tarifa.update({
      where: { id },
      data,
    });
  }
}
