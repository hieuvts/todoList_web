import React, { useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import addTodoAsync from "../../redux/todoSlice";

function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleInput = () => {
    if (!inputValue) return;
    dispatch(addTodoAsync({ task: inputValue }));
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
      <button className="button-add" shape="round" onClick={handleInput}>
        Add
      </button>

      {/* <h2> InputValue: {inputValue} </h2> */}
    </div>
  );
}

export default TodoInput;
