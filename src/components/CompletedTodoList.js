import React from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";
function CompletedTodoList() {
  const todo = useSelector((state) => state.todo);
  const completedTodoList = todo.filter(
    (value, index) => value.isCompleted === true
  );
  return (
    <div className="completedTodoList">
      <h1>Completed Todo {completedTodoList.length}</h1>
      {completedTodoList.map((value, index) => {
        return <Todo key={index} todo={value} status="completed" />;
      })}
    </div>
  );
}

export default CompletedTodoList;
