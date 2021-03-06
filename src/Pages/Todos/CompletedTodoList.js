import React from "react";
import Todo from "./Todo";

export default function CompletedTodoList({ todo }) {
  return (
    <div className="completedTodoList">
      <h1>Completed Todo {todo.length}</h1>
      {todo.map((value, index) => {
        return <Todo key={index} todo={value} status="completed" />;
      })}
    </div>
  );
}

