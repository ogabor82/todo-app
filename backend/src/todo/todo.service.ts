import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany({ orderBy: { order: 'asc' } });
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

  async orderTodos(sourceIndex: number, destinationIndex: number) {
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

  async modifyTodo(id: string, title?: string, completed?: boolean) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todo) {
      throw new HttpException(
        `Todo with id ${id} not found`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const updateData: { title?: string; completed?: boolean } = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    return this.prisma.todo.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
  }
}
