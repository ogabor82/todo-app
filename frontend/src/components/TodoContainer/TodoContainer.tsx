import { useEffect, useState } from "react";
import { Todo } from "../../models/todo";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";
import TodoHeader from "../TodoHeader/TodoHeader";
import { getTodos, reorderTodos } from "../../services/api";
import TodoItem from "../TodoItem/TodoItem";

const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const reorderedItems = Array.from(todos);
    const [reorderedItem] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(destinationIndex, 0, reorderedItem);
    setTodos(reorderedItems);

    try {
      const response = await reorderTodos(sourceIndex, destinationIndex);

      setTodos(response);
    } catch (error) {
      console.error("Failed to reorder todos:", error);
      const response = await getTodos();
      setTodos(response);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 border-gray-500 rounded-md p-16 w-full lg:max-w-md mx-auto bg-white">
      <TodoHeader todos={todos} setTodos={setTodos} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <TodoItem
                      todo={todo}
                      provided={provided}
                      setTodos={setTodos}
                      todos={todos}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoContainer;
