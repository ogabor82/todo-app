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

  async reorderTodos(sourceIndex: number, destinationIndex: number) {
    const todos = await this.prisma.todo.findMany({
      orderBy: { order: 'asc' },
    });

    const [movedItem] = todos.splice(sourceIndex, 1);
    todos.splice(destinationIndex, 0, movedItem);

    const updates = todos.map((todo, index) => {
      return this.prisma.todo.update({
        where: { id: todo.id },
        data: { order: index },
      });
    });

    await Promise.all(updates);
    return this.prisma.todo.findMany({ orderBy: { order: 'asc' } });
  }
}
