import {
  IsEmail,
  IsIn,
  IsInt,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  name: string;

  @IsString({ message: 'El DNI/CUIT debe ser texto' })
  @IsNotEmpty({ message: 'El DNI/CUIT es obligatorio' })
  @Length(7, 15, { message: 'El DNI/CUIT debe tener entre 7 y 15 caracteres' })
  dni: string;

  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @MaxLength(150, { message: 'El correo no puede superar los 150 caracteres' })
  email: string;

  @IsIP(4, { message: 'La dirección IP debe ser una IPv4 válida (ej: 192.168.10.15)' })
  @IsNotEmpty({ message: 'La dirección IP es obligatoria' })
  ip_address: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser texto' })
  @IsIn(['Habilitado', 'Suspendido', 'Baja'], {
    message: 'El estado debe ser Habilitado, Suspendido o Baja',
  })
  status?: string;

  @IsInt({ message: 'El ID del plan debe ser un número entero' })
  @IsPositive({ message: 'El ID del plan debe ser mayor a 0' })
  plan_id: number;
}
