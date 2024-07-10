import React, { useState } from "react";
import "./add.scss";
import DateLocale from "../utils/date_time/date";
import TimeLocale from "../utils/date_time/time";
import TODO_APIs from "../api/todo_api";
import { Todo } from "../models/todo";
import { useUserStore } from "../store/user_store";
import { useNavigate } from "react-router-dom";
import LoadingEffect from "../utils/loading/loading";
import doneEffect from "../assets/done.mp3";

const AddPage: React.FC = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState<Todo>({
    Name: "",
    Short_Description: "",
    Deadline: new Date(),
    Status: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const doneAudio = new Audio(doneEffect); // sound effect
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // console.log("Add data: ", todoData);
      await TODO_APIs.add_todos(user?.token as string, todoData).then(
        (respone) => {
          if (respone) doneAudio.play();
          // console.log("Respones: ", respone.data);
          alert("Todo added successfully !!");
          navigate("/");
        }
      );
    } catch (error) {
      alert("Server error: !!\n\n" + String(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="add_page">
      <p className="heading">Add Todo</p>
      <div>
        {loading ? (
          <LoadingEffect />
        ) : (
          <div className="add_container">
            <form onSubmit={handleSubmit} className="add_form">
              <input
                required={true}
                type="text"
                placeholder="Title"
                className="title"
                value={todoData.Name}
                onChange={(e) =>
                  setTodoData({ ...todoData, Name: e.target.value })
                }
              />
              <textarea
                required={true}
                name="Short_Description"
                placeholder="Please write very short description...."
                className="description"
                value={todoData.Short_Description}
                onChange={(e) =>
                  setTodoData({
                    ...todoData,
                    Short_Description: e.target.value,
                  })
                }
              />
              <div className="status">
                <label>Status: </label>
                <select
                  name="Status"
                  value={todoData.Status}
                  onChange={(e) =>
                    setTodoData({ ...todoData, Status: e.target.value })
                  }
                >
                  <option value="">select</option>
                  <option value="upcoming">upcoming</option>
                  <option value="done">done</option>
                </select>
              </div>
              <div className="deadline_pick">
                Deadline: &nbsp;&nbsp;
                <input
                  type="datetime-local"
                  value={new Date(todoData.Deadline).toISOString().slice(0, 16)}
                  onChange={(e) =>
                    setTodoData({
                      ...todoData,
                      Deadline: new Date(e.target.value),
                    })
                  }
                />
              </div>
              <p className="today">
                <DateLocale />, <TimeLocale />
              </p>
              <button className="add_it_btn" type="submit">
                Add it
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPage;
