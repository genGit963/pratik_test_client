import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TodoResponseInterface } from "../models/todo";

interface TodoStore {
  todo: TodoResponseInterface | undefined;
  todos: Array<TodoResponseInterface>;
}

interface Action {
  setTodo: (todo: TodoResponseInterface) => void;
  setTodoList: (todos: Array<TodoResponseInterface>) => void;
}

export const useTodoStore = create<TodoStore & Action>()(
  persist(
    (set) => ({
      todo: undefined,
      todos: [],
      setTodo: (todo) => {
        set(() => ({ todo }));
      },
      setTodoList: (todos) => {
        set(() => ({ todos }));
      },
    }),
    {
      name: "Todo_todo",
      storage: createJSONStorage(() => localStorage),
      version: import.meta.env.VITE_APP_VERSION,
    }
  )
);
