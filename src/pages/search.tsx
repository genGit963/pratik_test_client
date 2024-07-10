import React, { useState } from "react";
import { useTodoStore } from "../store/todo_store";
import TodoCard from "../components/todo_card";
import { TodoResponseInterface } from "../models/todo";

const Search = () => {
  const { todos } = useTodoStore();
  const [searchList, setSearchList] = useState<TodoResponseInterface[]>([]);
  return (
    <React.Fragment>
      <input
        type="text"
        // value={searchText as string}
        onChange={(e) => {
          setSearchList(
            todos.filter((item) => item.Name.includes(e.target.value))
          );
        }}
        style={{ width: "40%", padding: "0.2rem" }}
        placeholder="Search Todo"
      />
      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        {searchList.map((item) => {
          return (
            <TodoCard
              key={item._id}
              _id={item._id}
              Name={item.Name}
              Short_Description={item.Short_Description}
              Deadline={item.Deadline}
              Status={item.Status}
              User={item.User}
              __v={item.__v}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Search;
