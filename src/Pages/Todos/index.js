import TodoInput from "./TodoInput";
import UncompletedTodoList from "./UncompletedTodoList";
import CompletedTodoList from "./CompletedTodoList";
import getTodoAsync from "../../redux/todoSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Todos() {
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
