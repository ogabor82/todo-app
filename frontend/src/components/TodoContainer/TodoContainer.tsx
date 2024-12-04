import { useState } from "react";
import { Todo } from "../../models/todo";

const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), title: newTodo, completed: false, order: todos.length },
    ]);
    setNewTodo("");
  };

  return (
    <div className="flex flex-col gap-4 border-2 border-gray-500 rounded-md p-4">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
        />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoContainer;
