import { Todo } from "../models/todo";
import APP_API from "./config_axios";

const TODO_APIs = {
  all_your_todos: async (token: string) => {
    return await APP_API.request({
      url: "/api/todo/all",
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  add_todos: async (token: string, data: Todo) => {
    return await APP_API.request({
      url: "/api/todo/add",
      method: "POST",
      data: data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  update_todo: async (token: string, id: string, data: Todo) => {
    return await APP_API.request({
      url: `/api/todo/update/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  direct_done_update_todo: async (token: string, id: string) => {
    return await APP_API.request({
      url: `/api/todo/done/${id}`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  direct_undone_update_todo: async (token: string, id: string) => {
    return await APP_API.request({
      url: `/api/todo/undone/${id}`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  delete_todo: async (token: string, id: string) => {
    // console.log("api: ", id);
    return await APP_API.request({
      url: `/api/todo/delete/${id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default TODO_APIs;
