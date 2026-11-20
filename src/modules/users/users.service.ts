import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { isPrismaErrorCode } from '../prisma/prisma-error.util';
import { hashPassword } from '../auth/password.util';
import { UpdateUserDto } from './dto/update-user.dto';

const USER_SAFE_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  created_at: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: USER_SAFE_SELECT,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: USER_SAFE_SELECT,
    });

    if (!user) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const data: UpdateUserDto = { ...updateUserDto };

    if (data.email) {
      data.email = data.email.trim().toLowerCase();
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: USER_SAFE_SELECT,
      });
    } catch (error) {
      if (isPrismaErrorCode(error, 'P2002')) {
        throw new ConflictException(
          'Ya existe otro usuario registrado con ese correo electrónico.',
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
      select: USER_SAFE_SELECT,
    });
  }
}