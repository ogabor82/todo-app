import { useEffect, useState } from "react";
import { Todo } from "../../models/todo";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import TodoHeader from "../TodoHeader/TodoHeader";

const API_URL = import.meta.env.VITE_API_URL;

const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(`${API_URL}/todo`);
    const data = await response.json();
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
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/todo/reorder`,
        {
          sourceIndex,
          destinationIndex,
        }
      );

      setTodos(response.data);
    } catch (error) {
      console.error("Failed to reorder todos:", error);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
      setTodos(response.data);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-2 border-gray-500 rounded-md p-4">
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
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {todo.title}
                    </div>
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
