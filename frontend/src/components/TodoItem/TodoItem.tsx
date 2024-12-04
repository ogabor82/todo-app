import { Todo } from "../../models/todo";
import { DraggableProvided } from "@hello-pangea/dnd";

interface TodoItemProps {
  todo: Todo;
  provided: DraggableProvided;
}

const TodoItem = ({ todo, provided }: TodoItemProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
    >
      <span className="flex-grow">{todo.title}</span>
    </div>
  );
};

export default TodoItem;
