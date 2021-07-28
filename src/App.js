import "./appStyle.scss";
import "antd/dist/antd.css";
import UncompletedTodoList from "./components/UncompletedTodoList";
import CompletedTodoList from "./components/CompletedTodoList";
import TodoInput from "./components/TodoInput";
import { useSelector, useDispatch } from "react-redux";
import { getTodoAsync } from "./redux/todoSlice";
import { useEffect } from "react";

function App() {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);
  const uncompletedTodoList = todo.filter(
    (element) => element.isCompleted === false
  );
  const completedTodoList = todo.filter(
    (element) => element.isCompleted === true
  );
  return (
    <div>
      <h1> What is today task ? </h1>
      <TodoInput />
      <div className="allTodo">
        <UncompletedTodoList todo={uncompletedTodoList} />
        <h2> Total todo :{todo.length} </h2>{" "}
        <CompletedTodoList todo={completedTodoList} />
      </div>
    </div>
  );
}

export default App;
