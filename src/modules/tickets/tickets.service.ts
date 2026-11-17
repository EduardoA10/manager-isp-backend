import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: createTicketDto.customer_id },
    });

    if (!customer) {
      throw new NotFoundException(
        `No existe un cliente con id ${createTicketDto.customer_id}.`,
      );
    }

    if (createTicketDto.assigned_user_id) {
      const user = await this.prisma.user.findUnique({
        where: { id: createTicketDto.assigned_user_id },
      });

      if (!user) {
        throw new NotFoundException(
          `No existe un usuario/técnico con id ${createTicketDto.assigned_user_id}.`,
        );
      }
    }

    return this.prisma.ticket.create({
      data: createTicketDto,
      include: {
        customer: true,
        assigned_user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });
  }

  findAll() {
    return this.prisma.ticket.findMany({
      orderBy: { id: 'asc' },
      include: {
        customer: true,
        assigned_user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        customer: true,
        assigned_user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException(`No existe un ticket con id ${id}.`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    await this.findOne(id);

    if (updateTicketDto.customer_id) {
      const customer = await this.prisma.customer.findUnique({
        where: { id: updateTicketDto.customer_id },
      });

      if (!customer) {
        throw new NotFoundException(
          `No existe un cliente con id ${updateTicketDto.customer_id}.`,
        );
      }
    }

    if (updateTicketDto.assigned_user_id) {
      const user = await this.prisma.user.findUnique({
        where: { id: updateTicketDto.assigned_user_id },
      });

      if (!user) {
        throw new NotFoundException(
          `No existe un usuario/técnico con id ${updateTicketDto.assigned_user_id}.`,
        );
      }
    }

    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
      include: {
        customer: true,
        assigned_user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}