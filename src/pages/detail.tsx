import React, { useState } from "react";
import "./detail.scss";
import { useNavigate } from "react-router-dom";
import TimeLocale from "../utils/date_time/time";
import DateLocale from "../utils/date_time/date";
import { useTodoStore } from "../store/todo_store";
import TODO_APIs from "../api/todo_api";
import { useUserStore } from "../store/user_store";
import LoadingEffect from "../utils/loading/loading";
import soundEffect from "../assets/success.mp3";
import doneEffect from "../assets/done.mp3";

const DetailPage: React.FC = () => {
  const { todo } = useTodoStore();
  const { user } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // update handling
  const handleUpdate = () => {
    navigate("/update");
  };
  const funnyAudio = new Audio(soundEffect);
  const doneAudio = new Audio(doneEffect);

  // delete handling
  const handleDelete = async () => {
    try {
      setLoading(true);
      await TODO_APIs.delete_todo(
        user?.token as string,
        todo?._id as string
      ).then((response) => {
        // console.log("Response: ", response.data);
        if (response) alert("Deleted Successfully !!");
        navigate("/");
      });
    } catch (error) {
      alert("Server Error !! \n" + String(error));
    } finally {
      setLoading(false);
    }
  };

  // direct done handling
  const handleDirectDone = async () => {
    try {
      setLoading(true);
      await TODO_APIs.direct_done_update_todo(
        user?.token as string,
        todo?._id as string
      ).then((response) => {
        if (response) doneAudio.play(); // audio effect
        // console.log("Response: ", response.data);
        alert("Well Done, Keep it up!!");
        navigate("/");
      });
    } catch (error) {
      alert("Server Error !! \n" + String(error));
    } finally {
      setLoading(false);
    }
  };

  // direct undone handling
  const handleDirectUndone = async () => {
    try {
      setLoading(true);
      await TODO_APIs.direct_undone_update_todo(
        user?.token as string,
        todo?._id as string
      ).then((response) => {
        if (response) funnyAudio.play(); // audio effect
        // console.log("Response: ", response.data);
        alert("Added to Upcoming!! \n Sorry for sound effect, #Thor 🤣");
        navigate("/");
      });
    } catch (error) {
      alert("Server Error !! \n" + String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detail_page">
      <p className="heading">Todo Detail</p>
      <hr style={{ marginBottom: "20px" }} />
      <div>
        {loading ? (
          <LoadingEffect />
        ) : (
          <div className="detail_container">
            <div className="detail_section">
              <p className="title">{todo?.Name}</p>
              <p className="description"> {todo?.Short_Description}</p>
              <p className="status">
                Status:{" "}
                <span
                  className={todo?.Status === "done" ? "span_done" : "span_upc"}
                >
                  {todo?.Status}
                </span>
              </p>

              <p className="deadline">
                Deadline:{" "}
                <span>{new Date(todo?.Deadline as Date).toDateString()}</span>,{" "}
                <span>
                  {new Date(todo?.Deadline as Date).toLocaleTimeString()}
                </span>
              </p>
              <p className="created">
                Created At:{" "}
                <span>{new Date(todo?.createdAt as Date).toDateString()}</span>,{" "}
                <span>
                  {new Date(todo?.createdAt as Date).toLocaleTimeString()}
                </span>
              </p>
              <p className="updated">
                Update At :{" "}
                <span>{new Date(todo?.updatedAt as Date).toDateString()}</span>,{" "}
                <span>
                  {new Date(todo?.updatedAt as Date).toLocaleTimeString()}
                </span>
              </p>

              <p className="today">
                Today: <DateLocale />, <TimeLocale />{" "}
              </p>

              <div className="button_cont">
                <button className="update_btn" onClick={handleUpdate}>
                  Update
                </button>
                <button className="delete_btn" onClick={handleDelete}>
                  Delete
                </button>
                {todo?.Status === "upcoming" && (
                  <button className="done_btn" onClick={handleDirectDone}>
                    Done
                  </button>
                )}

                {todo?.Status === "done" && (
                  <button className="done_btn" onClick={handleDirectUndone}>
                    Un-done
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
