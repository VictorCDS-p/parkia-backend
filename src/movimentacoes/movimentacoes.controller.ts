import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { EntradaMovimentacaoDto } from './dto/entrada-movimentacao.dto';
import { SaidaMovimentacaoDto } from './dto/saida-movimentacao.dto';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Post('entrada')
  registrarEntrada(@Body() dto: EntradaMovimentacaoDto) {
    return this.movimentacoesService.registrarEntrada(dto);
  }

  @Post('saida')
  registrarSaida(@Body() dto: SaidaMovimentacaoDto) {
    return this.movimentacoesService.registrarSaida(dto.placa);
  }

  @Get()
  listarAtivas() {
    return this.movimentacoesService.findAtivas();
  }

  @Get('historico')
  historico(@Query('inicio') inicio?: string, @Query('fim') fim?: string) {
    return this.movimentacoesService.findHistorico(inicio, fim);
  }
}
