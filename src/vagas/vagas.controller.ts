import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { VagasService } from './vagas.service';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';
import { StatusVaga, TipoVaga } from '@prisma/client';

@Controller('vagas')
export class VagasController {
  constructor(private readonly vagasService: VagasService) {}

  @Get('estatisticas')
  estatisticas() {
    return this.vagasService.estatisticas();
  }

  @Get()
  findAll(@Query('status') status?: string, @Query('tipo') tipo?: string) {
    const statusClean = status?.trim() || undefined;
    const tipoClean = tipo?.trim() || undefined;

    const statusEnum = statusClean as StatusVaga;
    const tipoEnum = tipoClean as TipoVaga;

    if (statusClean && !Object.values(StatusVaga).includes(statusEnum)) {
      throw new BadRequestException(
        `Status inválido. Opções permitidas: ${Object.values(StatusVaga).join(', ')}`,
      );
    }

    if (tipoClean && !Object.values(TipoVaga).includes(tipoEnum)) {
      throw new BadRequestException(
        `Tipo inválido. Opções permitidas: ${Object.values(TipoVaga).join(', ')}`,
      );
    }

    return this.vagasService.findAll(statusEnum, tipoEnum);
  }

  @Post()
  create(@Body() dto: CreateVagaDto) {
    return this.vagasService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVagaDto) {
    return this.vagasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vagasService.remove(id);
  }
}
