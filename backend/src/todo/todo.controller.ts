import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  createTodo(@Body() body: { title: string }) {
    return this.todoService.createTodo(body.title);
  }
}
