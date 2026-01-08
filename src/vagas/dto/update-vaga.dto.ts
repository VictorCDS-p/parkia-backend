import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusVaga, TipoVaga } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdateVagaDto {
  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsEnum(TipoVaga)
  tipo?: TipoVaga;

  @IsOptional()
  @IsEnum(StatusVaga)
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  status?: StatusVaga;
}
