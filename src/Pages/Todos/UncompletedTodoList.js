import Todo from "./Todo";

function UncompletedTodoList({ todo }) {
  return (
    <div>
      <h1> Uncompleted Todo {todo.length} </h1>{" "}
      {todo.map((value, index) => {
        return <Todo key={index} todo={value} status="uncompleted" />;
      })}{" "}
    </div>
  );
}

export default UncompletedTodoList;
