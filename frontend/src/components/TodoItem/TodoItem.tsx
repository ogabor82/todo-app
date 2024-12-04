import { Todo } from "../../models/todo";
import { DraggableProvided } from "@hello-pangea/dnd";
import TrashSimple from "../../assets/TrashSimple.svg";
import { deleteTodo } from "../../services/api";

interface TodoItemProps {
  todo: Todo;
  provided: DraggableProvided;
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
}

const TodoItem = ({ todo, provided, setTodos, todos }: TodoItemProps) => {
  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id.toString());
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
    >
      <span className="flex-grow">{todo.title}</span>
      <img
        src={TrashSimple}
        alt="Delete todo"
        className="cursor-pointer hover:opacity-75"
        onClick={handleDelete}
      />
    </div>
  );
};

export default TodoItem;
