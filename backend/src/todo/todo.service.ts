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
    return this.prisma.todo.create({ data: { title, order: 0 } });
  }
}
