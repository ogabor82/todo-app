import axios from "axios";
import { Todo } from "../models/todo";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodos: () => Promise<Todo[]> = async () => {
  const response = await api.get("/todo");
  return response.data;
};

export const addTodo: (title: string) => Promise<Todo> = async (title) => {
  const response = await api.post("/todo", { title });
  return response.data;
};

export const deleteTodo: (id: string) => Promise<Todo> = async (id) => {
  const response = await api.delete(`/todo/${id}`);
  return response.data;
};

export const setCompleted: (
  id: string,
  completed: boolean
) => Promise<Todo> = async (id, completed) => {
  const response = await api.patch(`/todo/${id}/completed`, { completed });
  return response.data;
};

export const reorderTodos: (
  sourceIndex: number,
  destinationIndex: number
) => Promise<Todo[]> = async (sourceIndex, destinationIndex) => {
  const response = await api.patch("/todo/reorder", {
    sourceIndex,
    destinationIndex,
  });
  return response.data;
};
