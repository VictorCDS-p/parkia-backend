import { Controller, Get, Put, Param, Body } from '@nestjs/common';
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
    return this.tarifasService.update(id, dto);
  }
}
