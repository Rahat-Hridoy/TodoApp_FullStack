import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateTodoDto) {
    return this.prisma.todo.create({ data: dto });
  }

  // READ ALL
  async findAll() {
    return this.prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  }

  // READ ONE
  async findOne(id: number) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  // UPDATE
  async update(id: number, dto: UpdateTodoDto) {
    return this.prisma.todo.update({ where: { id }, data: dto });
  }

  // DELETE
  async remove(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}