import { Todo } from "../../models/todo";
import { DraggableProvided } from "@hello-pangea/dnd";
import TrashSimple from "../../assets/TrashSimple.svg";
import { deleteTodo, setCompleted } from "../../services/api";

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

  const handleComplete = async (id: string) => {
    try {
      await setCompleted(id, !todo.completed);
      setTodos(
        todos.map((t) =>
          t.id === parseInt(id) ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.error("Failed to set completed:", error);
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={() => handleComplete(todo.id.toString())}
      />
      <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>
        {todo.title}
      </span>
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
