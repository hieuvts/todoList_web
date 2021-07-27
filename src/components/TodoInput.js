import React, { useState } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleInput = () => {
    if (!inputValue) return;
    const newTodo = {
      id: Math.floor(Math.random() * 100),
      text: inputValue,
      isCompleted: false,
    };

    console.log(newTodo);
    dispatch(
      addTodo(newTodo)
    );
    setInputValue("");
  };
  return (
    <div className="inputForm">
      <Input
        className="input"
        value={inputValue}
        placeholder="Add task"
        onPressEnter={handleInput}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        className="button-add"
        type="primary"
        shape="round"
        onClick={handleInput}
      >
        Add
      </Button>
      <p>InputValue: {inputValue}</p>
    </div>
  );
}

export default TodoInput;
