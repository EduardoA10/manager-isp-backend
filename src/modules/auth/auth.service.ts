import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { isPrismaErrorCode } from '../prisma/prisma-error.util';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hashPassword, verifyPassword } from './password.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const normalizedEmail = registerAuthDto.email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new ConflictException(
        'Ya existe un usuario registrado con ese correo electrónico.',
      );
    }

    const hashedPassword = await hashPassword(registerAuthDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: registerAuthDto.name,
          email: normalizedEmail,
          password: hashedPassword,
          role: registerAuthDto.role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          created_at: true,
        },
      });

      return {
        message: 'Usuario registrado correctamente',
        user,
      };
    } catch (error) {
      if (isPrismaErrorCode(error, 'P2002')) {
        throw new ConflictException(
          'Ya existe un usuario registrado con ese correo electrónico.',
        );
      }
      throw error;
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const normalizedEmail = loginAuthDto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const isPasswordValid = await verifyPassword(
      loginAuthDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}