import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
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

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

  @Patch('order')
  async orderTodos(
    @Body() reorderData: { sourceIndex: number; destinationIndex: number },
  ) {
    return this.todoService.orderTodos(
      reorderData.sourceIndex,
      reorderData.destinationIndex,
    );
  }

  @Patch(':id')
  modifyTodo(
    @Param('id') id: string,
    @Body() body: { title?: string; completed?: boolean },
  ) {
    return this.todoService.modifyTodo(id, body.title, body.completed);
  }
}
