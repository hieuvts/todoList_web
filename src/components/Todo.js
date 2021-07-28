import { Modal, Button } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { FaCheckDouble, FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateTodoAsync, deleteTodoAsync } from "../redux/todoSlice";
import { useState } from "react";

function Todo({ todo }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const toggleTodoStatus = (todoID) => {
    dispatch(
      updateTodoAsync({
        id: todoID,
        isCompleted: !todo.isCompleted,
      })
    );
  };
  const handleDeleteButton = (todoID) => {
    dispatch(deleteTodoAsync({ id: todoID }));
  };

  const footerModal = (
    <div className="button">
      <Button className="button delete" onClick={() => setShowModal(false)}>
        Close
      </Button>
      <Button
        className="button complete"
        onClick={() => {
          handleDeleteButton(todo._id);
          setShowModal(false);
        }}
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
          <Button
            className="button complete"
            onClick={() => toggleTodoStatus(todo._id)}
          >
            {todo.isCompleted ? "Uncompleted" : "Complete"}
          </Button>

          <Button className="button delete" onClick={() => setShowModal(true)}>
            Delete
          </Button>
        </div>
      </div>
      <Modal
        visible={showModal}
        footer={footerModal}
        onCancel={() => setShowModal(false)}
        title={<b> Confirm </b>}
        onOk={() => setShowModal(false)}
      >
        <CloseCircleTwoTone twoToneColor="#dfa111" />
        Are you sure you want to delete this task ?
      </Modal>
    </div>
  );
}

export default Todo;
