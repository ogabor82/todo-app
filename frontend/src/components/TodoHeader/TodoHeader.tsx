import { useState } from "react";
import { Todo } from "../../models/todo";
import { addTodo } from "../../services/api";

const TodoHeader = ({
  setTodos,
  todos,
}: {
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
}) => {
  const [newTodo, setNewTodo] = useState("");

  const createTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const todoResponse = await addTodo(newTodo);

      setTodos([
        ...todos,
        {
          id: todoResponse.id,
          title: todoResponse.title,
          completed: todoResponse.completed,
          order: todoResponse.order,
        },
      ]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }

    setNewTodo("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-2">
        <h1 className="text-6xl font-bold">Tasks</h1>
        <button
          className="cursor-pointer bg-gray-200 rounded-md p-4"
          onClick={createTodo}
        >
          <span className="text-2xl">🚀</span>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500 font-bold">New task:</p>
        <form onSubmit={handleSubmit}>
          <input
            className="border-b border-gray-200 w-full focus:outline-none text-center"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};

export default TodoHeader;
