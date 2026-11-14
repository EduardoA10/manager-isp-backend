import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(60, { message: 'El nombre no puede superar los 60 caracteres' })
  name: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @MaxLength(100, { message: 'El correo no puede superar los 100 caracteres' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(50, {
    message: 'La contraseña no puede superar los 50 caracteres',
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  // isin restringe los valores permitidos para el rol
  @IsIn(['admin', 'operador_noc', 'tecnico_noc', 'tecnico_campo'], {
    message:
      'El rol debe ser uno de los permitidos: admin, operador_noc, tecnico_noc o tecnico_campo',
  })
  role?: string;
}
