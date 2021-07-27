import { Modal, Button } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { FaCheckDouble, FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateTodoAsync, deleteTodo } from "../redux/todoSlice";
import { useState } from "react";

function Todo({ todo, status }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleCompleteButton = (todoID) => {
    dispatch(
      updateTodoAsync({
        id: todoID,
        isCompleted: true,
      })
    );
  };
  const undoCompletedTodo = (todoID) => {
    dispatch(
      updateTodoAsync({
        id: todoID,
        isCompleted: false,
      })
    );
  };
  const handleDeleteButton = (todoID) => {
    dispatch(deleteTodo({ id: todoID }));
  };

  const footerModal = (
    <div className="button">
      <Button className="button delete" onClick={() => setShow(false)}>
        Close
      </Button>
      <Button
        className="button complete"
        onClick={() => handleDeleteButton(todo._id)}
      >
        Ok
      </Button>
    </div>
  );
  return (
    <div className="todo">
      <div>
      <p>ID: {todo._id}</p>
        <p>Task: {todo.task}</p>
        <div className="todoStatus">
          <p> Completed: </p>
          {todo.isCompleted ? <FaCheckDouble /> : <FaTimesCircle />}
        </div>
        <div className="button">
          {!todo.isCompleted ? (
            <Button
              className="button complete"
              onClick={() => handleCompleteButton(todo._id)}
            >
              Completed
            </Button>
          ) : null}
          {todo.isCompleted === true ? (
            <Button
              className="button complete"
              onClick={() => undoCompletedTodo(todo._id)}
            >
              Uncompleted
            </Button>
          ) : null}
          <Button className="button delete" onClick={() => setShow(true)}>
            Delete
          </Button>
        </div>
      </div>
      <Modal
        visible={show}
        footer={footerModal}
        onCancel={() => setShow(false)}
        title={<b> Confirm </b>}
      >
        <CloseCircleTwoTone twoToneColor="#dfa111" />
        Are you sure you want to delete this task ?
      </Modal>
    </div>
  );
}

export default Todo;
