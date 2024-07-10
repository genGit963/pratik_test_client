import { useNavigate } from "react-router-dom";
import { TodoResponseInterface } from "../models/todo";
import "./todo_card.scss";
import { useTodoStore } from "../store/todo_store";

// import alertSound from "../assets/success.mp3";

const TodoCard: React.FC<TodoResponseInterface> = ({
  _id,
  Name,
  Short_Description,
  Deadline,
  Status,
  User,
  __v,
  createdAt,
  updatedAt,
}) => {
  const navigate = useNavigate();
  const { setTodo } = useTodoStore();

  // to detail page
  const handleDetail = () => {
    setTodo({
      _id: _id,
      Name: Name,
      Short_Description: Short_Description,
      Deadline: Deadline,
      Status: Status,
      User: User,
      __v: __v,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    navigate("/detail");
  };

  return (
    <div className="todo_card" onClick={handleDetail}>
      <div className={Status === "done" ? "ring_done" : "ring_upcoming"}></div>
      <div className="todo_detail">
        <p className="title">{Name}</p>
        <p className="short_des">{Short_Description}</p>
        <p className="status">
          Status:{" "}
          <span
            className={Status === "done" ? "status_done" : "status_upcoming"}
          >
            {Status}
          </span>
        </p>
        <div className="dates">
          <p className="deadline">
            Deadline: <span>{new Date(Deadline).toDateString()}</span>,{" "}
            <span>{new Date(Deadline).toLocaleTimeString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
