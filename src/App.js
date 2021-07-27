import "./styled.scss";
import "antd/dist/antd.css";
import TodoList from "./components/TodoList";
import CompletedTodoList from "./components/CompletedTodoList";
import TodoInput from "./components/TodoInput";
import { useSelector } from "react-redux";

function App() {
  const totalTodo = useSelector((state) => state.todo);
  return (
    <div className="appBody">
      <h1> What is today task ? </h1> <p> Total todo :{totalTodo.length} </p>
      <TodoInput />
      <div className="allTodo">
        <TodoList />
        {/* <CompletedTodoList /> */}
      </div>
    </div>
  );
}

export default App;
