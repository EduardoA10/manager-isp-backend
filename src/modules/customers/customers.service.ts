import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: createCustomerDto.plan_id },
    });

    if (!plan) {
      throw new NotFoundException(
        `No existe un plan con id ${createCustomerDto.plan_id}.`,
      );
    }

    return this.prisma.customer.create({
      data: createCustomerDto,
      include: { plan: true },
    });
  }

  findAll() {
    return this.prisma.customer.findMany({
      orderBy: { id: 'asc' },
      include: { plan: true },
    });
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        plan: true,
        tickets: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`No existe un cliente con id ${id}.`);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id);

    if (updateCustomerDto.plan_id) {
      const plan = await this.prisma.plan.findUnique({
        where: { id: updateCustomerDto.plan_id },
      });

      if (!plan) {
        throw new NotFoundException(
          `No existe un plan con id ${updateCustomerDto.plan_id}.`,
        );
      }
    }

    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
      include: { plan: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.customer.delete({
      where: { id },
    });
  }
}