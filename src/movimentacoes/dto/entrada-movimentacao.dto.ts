import { IsEnum, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { TipoVeiculo } from '@prisma/client';
import { Transform } from 'class-transformer';

export class EntradaMovimentacaoDto {
  @IsUUID(4, { message: 'ID da vaga inválido' })
  @IsNotEmpty({ message: 'O ID da vaga é obrigatório' })
  vagaId: string;

  @IsString()
  @IsNotEmpty({ message: 'A placa é obrigatória' })
  @Transform(({ value }: { value: string }) => value?.trim().toUpperCase())
  @Matches(/^[a-zA-Z]{3}-?[0-9][a-zA-Z0-9][0-9]{2}$/, {
    message: 'Placa inválida. Formatos aceitos: AAA-1234, AAA1234 ou AAA1A11',
  })
  placa: string;

  @IsEnum(TipoVeiculo, { message: 'Tipo de veículo inválido' })
  @IsNotEmpty({ message: 'O tipo do veículo é obrigatório' })
  tipoVeiculo: TipoVeiculo;
}
