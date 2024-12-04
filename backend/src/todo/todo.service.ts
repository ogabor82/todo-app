import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async createTodo(title: string): Promise<Todo> {
    const lastTodo = await this.prisma.todo.findFirst({
      orderBy: { order: 'desc' },
    });
    return this.prisma.todo.create({
      data: { title, order: lastTodo?.order + 1 || 0 },
    });
  }

  async deleteTodo(id: string): Promise<Todo> {
    return this.prisma.todo.delete({ where: { id: parseInt(id) } });
  }
}
