import React, { useState } from "react";
import "./update.scss";
import DateLocale from "../utils/date_time/date";
import TimeLocale from "../utils/date_time/time";
import { useTodoStore } from "../store/todo_store";
import { Todo } from "../models/todo";
import TODO_APIs from "../api/todo_api";
import { useUserStore } from "../store/user_store";
import LoadingEffect from "../utils/loading/loading";
import { useNavigate } from "react-router-dom";

const UpdatePage: React.FC = () => {
  const { todo } = useTodoStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [updateData, setUpdateData] = useState<Todo>({
    Name: todo?.Name as string,
    Short_Description: todo?.Short_Description as string,
    Deadline: todo?.Deadline as Date,
    Status: todo?.Status as string,
  });

  // console.log("data: ", updateData);
  const handleUpdateSubmit = async () => {
    try {
      setLoading(true);
      const token: string = user?.token as string;
      await TODO_APIs.update_todo(token, todo?._id as string, updateData).then(
        (response) => {
          // console.log("Updated data : ", response.data);
          if (response) alert("Update Successfully !!");
          navigate("/");
        }
      );
    } catch (error) {
      alert("Server Error: \n" + String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update_page">
      <p className="heading">Update Todo</p>
      <div>
        {loading ? (
          <LoadingEffect />
        ) : (
          <div className="update_container">
            <form onSubmit={handleUpdateSubmit} className="update_form">
              <input
                required={true}
                type="text"
                placeholder="Title"
                className="title"
                value={updateData.Name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, Name: e.target.value })
                }
              />
              <textarea
                required={true}
                name="Short_Description"
                placeholder="Please write very short description...."
                className="description"
                value={updateData.Short_Description}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    Short_Description: e.target.value,
                  })
                }
              />
              <div className="status">
                <label>Status: </label>
                <select
                  name="Status"
                  value={updateData.Status}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, Status: e.target.value })
                  }
                >
                  <option value="upcoming">upcoming</option>
                  <option value="done">done</option>
                </select>
              </div>
              <p className="p_date">
                Previous Deadline:{" "}
                {new Date(todo?.Deadline as Date).toDateString()},
                {new Date(todo?.Deadline as Date).toLocaleTimeString()}
              </p>{" "}
              <div className="deadline_pick">
                Change Deadline: &nbsp;&nbsp;
                <input
                  type="datetime-local"
                  value={new Date(updateData.Deadline)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      Deadline: new Date(e.target.value),
                    })
                  }
                />
              </div>
              <p className="today">
                <DateLocale />, <TimeLocale />
              </p>
              <button className="add_it_btn" type="submit">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePage;
