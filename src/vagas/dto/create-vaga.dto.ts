import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoVaga } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateVagaDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.trim().toUpperCase())
  numero: string;

  @IsEnum(TipoVaga)
  tipo: TipoVaga;
}
