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
