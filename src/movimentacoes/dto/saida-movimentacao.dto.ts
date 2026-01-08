import { IsNotEmpty, IsString } from 'class-validator';

export class SaidaMovimentacaoDto {
  @IsString()
  @IsNotEmpty()
  placa: string;
}
