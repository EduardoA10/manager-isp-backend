import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: createPlanDto,
    });
  }

  findAll() {
    return this.prisma.plan.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new NotFoundException(`No existe un plan con id ${id}.`);
    }

    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    await this.findOne(id);

    return this.prisma.plan.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.plan.delete({
      where: { id },
    });
  }
}