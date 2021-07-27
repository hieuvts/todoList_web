import Todo from "./Todo";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoAsync } from "../redux/todoSlice";
function TodoList({ setTodo }) {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);
  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  // const uncompletedTodoList = todo.filter(
  //   (value, index) => value.isCompleted === false
  // );
  return (
    <div>
      {/* <h1>Uncompleted Todo {uncompletedTodoList.length}</h1> */}
      {todo.map((value, index) => {
        return <Todo key={index} todo={value} status="uncompleted" />;
      })}
    </div>
  );
}

export default TodoList;
