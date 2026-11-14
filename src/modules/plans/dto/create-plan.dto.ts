import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePlanDto {
  @IsString({ message: 'El nombre del plan debe ser texto' })
  @IsNotEmpty({ message: 'El nombre del plan es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  name: string;

  @IsInt({ message: 'La velocidad de bajada debe ser un número entero (Mbps)' })
  @IsPositive({ message: 'La velocidad de bajada debe ser mayor a 0' })
  @Min(1, { message: 'La velocidad mínima de bajada es 1 Mbps' })
  download_speed: number;

  @IsInt({ message: 'La velocidad de subida debe ser un número entero (Mbps)' })
  @IsPositive({ message: 'La velocidad de subida debe ser mayor a 0' })
  @Min(1, { message: 'La velocidad mínima de subida es 1 Mbps' })
  upload_speed: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número válido con hasta 2 decimales' },
  )
  @IsPositive({ message: 'El precio del plan debe ser mayor a 0' })
  price: number;
}
