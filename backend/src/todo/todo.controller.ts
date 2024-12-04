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

  @Patch('reorder')
  async reorderTodos(
    @Body() reorderData: { sourceIndex: number; destinationIndex: number },
  ) {
    return this.todoService.reorderTodos(
      reorderData.sourceIndex,
      reorderData.destinationIndex,
    );
  }
}
