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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <p className="text-sm text-gray-500">New task:</p>
      <form onSubmit={handleSubmit}>
        <input
          className="border-b border-gray-500 focus:outline-none text-center"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </form>
    </>
  );
};

export default TodoHeader;
