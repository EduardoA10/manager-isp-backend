import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  login(loginAuthDto: LoginAuthDto) {
    return {
      message: 'Validación de login superada correctamente',
      data: loginAuthDto,
    };
  }

  register(registerAuthDto: RegisterAuthDto) {
    return {
      message: 'Validación de registro superada correctamente',
      data: registerAuthDto,
    };
  }
}
