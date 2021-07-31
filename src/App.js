import "./appStyle.scss";
import "antd/dist/antd.css";
import UncompletedTodoList from "./components/UncompletedTodoList";
import CompletedTodoList from "./components/CompletedTodoList";
import TodoInput from "./components/TodoInput";
import LoginPage from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { getTodoAsync } from "./redux/todoSlice";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FaWrench } from "react-icons/fa";
import logosvg from "./images/logo.svg";
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
    <Router>
      <header>
        <Link className="logo" to="/">
          <img src={logosvg} alt="Home page" width="60px" height="60px" />
        </Link>
        <nav>
          <ul className="nav-link">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/test">
          <h1>Test</h1>
          <Test />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home
            todo={todo}
            uncompletedTodoList={uncompletedTodoList}
            completedTodoList={completedTodoList}
          />
        </Route>
      </Switch>
    </Router>
  );
}
function Home({ uncompletedTodoList, todo, completedTodoList }) {
  return (
    <>
      <div className="todolistbody">
        <h1> What is today task ? </h1>
        <TodoInput />
        <div className="allTodo">
          <UncompletedTodoList todo={uncompletedTodoList} />
          <h2> Total todo :{todo.length} </h2>
          <CompletedTodoList todo={completedTodoList} />
        </div>
      </div>
    </>
  );
}

function SignUp() {
  return <LoginPage />;
}
function Test() {
  return <h1>test page </h1>;
}
function About() {
  return <h1>About page </h1>;
}
export default App;
