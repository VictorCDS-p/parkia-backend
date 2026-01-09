import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { TarifasService } from './tarifas.service';

@Controller('tarifas')
export class TarifasController {
  constructor(private readonly tarifasService: TarifasService) {}

  @Get()
  findAll() {
    return this.tarifasService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException(
        'O corpo da requisição não pode estar vazio',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.tarifasService.update(id, dto);
  }
}
