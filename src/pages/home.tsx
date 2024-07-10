import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user_store";
import TodoCard from "../components/todo_card";
import "./home.scss";
import TODO_APIs from "../api/todo_api";
import { useTodoStore } from "../store/todo_store";
import LoadingEffect from "../utils/loading/loading";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { todos, setTodoList } = useTodoStore();
  const [totalDone, setTotalDone] = useState<number>(0);
  const [totalUpcoming, setTotalUpcoming] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllUserTodos = async () => {
      try {
        setLoading(true);
        await TODO_APIs.all_your_todos(user?.token as string).then(
          (response) => {
            // console.log("all your todo: ", response.data);
            setTodoList(response.data.todos);
            console.log("store todos: ", todos);
          }
        );
      } catch (error) {
        alert(String("Server Error! "));
      } finally {
        setLoading(false);
      }
    };
    setTotalDone(todos.filter((item) => item.Status == "done").length);
    setTotalUpcoming(todos.filter((item) => item.Status == "upcoming").length);
    fetchAllUserTodos();
  }, []);

  const [upcomingList, setUpcomingList] = useState(
    todos.filter((item) => item.Status === "upcoming")
  );
  const [doneList, setDoneList] = useState(
    todos.filter((item) => item.Status === "done")
  );

  // sorting [deadline]
  const [isSortUp, setIsSortedUp] = useState(false);
  const [isSortDone, setIsSortedDone] = useState(false);

  const sortingUpcoming = () => {
    setIsSortedUp(true);
    const sortedData = todos
      .filter((item) => item.Status == "upcoming")
      .sort(
        (a, b) =>
          new Date(b.Deadline).getTime() - new Date(a.Deadline).getTime()
      );
    setUpcomingList(sortedData);
  };
  const sortingDone = () => {
    // sorted by deadline
    setIsSortedDone(true);
    const sortedData = todos
      .filter((item) => item.Status == "done")
      .sort(
        (a, b) =>
          new Date(b.Deadline).getTime() - new Date(a.Deadline).getTime()
      );
    setDoneList(sortedData);
  };

  // tooltips
  const [showTT, setShowTT] = useState(false);
  const [showTTDone, setShowTTDone] = useState(false);
  return (
    <div>
      <button className="addtodo_btn" onClick={() => navigate("/add")}>
        Add New
      </button>
      <div>
        {loading ? (
          <LoadingEffect />
        ) : (
          <div className="home">
            <section className="upcoming_section">
              <div onClick={sortingUpcoming}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setShowTT(true)}
                  onMouseLeave={() => setShowTT(false)}
                >
                  <p style={{ color: "red" }}>
                    {totalUpcoming} : Upcoming Kaam
                  </p>
                  {isSortUp && (
                    <span style={{ fontSize: 10, color: "green" }}>sorted</span>
                  )}
                  {showTT && (
                    <span style={{ fontSize: 10, color: "green" }}>
                      <span>{isSortUp ? "sorted " : "sort "}</span>by deadline
                      time
                    </span>
                  )}
                </div>
                <hr style={{ margin: "5px 0px 20px 0px" }} />
              </div>
              <div className="upcoming_container">
                {/* only upcomming */}
                {upcomingList
                  .filter((item) => item.Status == "upcoming")
                  .map((todo) => (
                    <TodoCard
                      key={todo._id}
                      _id={todo._id}
                      Name={todo.Name}
                      Short_Description={todo.Short_Description}
                      Status={todo.Status}
                      Deadline={todo.Deadline}
                      User={todo.User}
                      createdAt={todo.createdAt}
                      updatedAt={todo.updatedAt}
                      __v={0}
                    />
                  ))}
              </div>
            </section>
            <section className="completed_section">
              <div onClick={sortingDone}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setShowTTDone(true)}
                  onMouseLeave={() => setShowTTDone(false)}
                >
                  <p style={{ color: "red" }}>{totalDone} : Done Kaam</p>
                  {isSortDone && (
                    <span style={{ fontSize: 10, color: "green" }}>sorted</span>
                  )}
                  {showTTDone && (
                    <span style={{ fontSize: 10, color: "green" }}>
                      <span>{isSortDone ? "sorted " : "sort "}</span>by deadline
                      time
                    </span>
                  )}
                </div>
                <hr style={{ margin: "5px 0px 20px 0px" }} />
              </div>
              <div className="completed_container">
                {/* only completed */}
                {doneList
                  .filter((item) => item.Status == "done")
                  .map((todo) => (
                    <TodoCard
                      key={todo._id}
                      _id={todo._id}
                      Name={todo.Name}
                      Short_Description={todo.Short_Description}
                      Status={todo.Status}
                      Deadline={todo.Deadline}
                      User={todo.User}
                      createdAt={todo.createdAt}
                      updatedAt={todo.updatedAt}
                      __v={0}
                    />
                  ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
