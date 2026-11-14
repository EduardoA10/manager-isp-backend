import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTicketDto {
  @IsInt({ message: 'El ID del cliente debe ser un número entero' })
  @IsPositive({ message: 'El ID del cliente debe ser mayor a 0' })
  customer_id: number;

  @IsOptional()
  @IsInt({ message: 'El ID del técnico asignado debe ser un número entero' })
  @IsPositive({ message: 'El ID del técnico asignado debe ser mayor a 0' })
  assigned_user_id?: number;

  @IsString({ message: 'La categoría debe ser texto' })
  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @MaxLength(100, { message: 'La categoría no puede superar los 100 caracteres' })
  category: string;

  @IsOptional()
  @IsString({ message: 'La prioridad debe ser texto' })
  @IsIn(['Baja', 'Media', 'Alta', 'Crítica'], {
    message: 'La prioridad debe ser Baja, Media, Alta o Crítica',
  })
  priority?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser texto' })
  @IsIn(['Abierto', 'En Proceso', 'Resuelto', 'Cerrado'], {
    message: 'El estado debe ser Abierto, En Proceso, Resuelto o Cerrado',
  })
  status?: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción del problema es obligatoria' })
  @MinLength(10, { message: 'La descripción debe detallar al menos 10 caracteres' })
  description: string;
}
