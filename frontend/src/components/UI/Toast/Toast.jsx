import React from "react";
import "./Toast.scss";
import { useDispatch } from "react-redux";
import { removeToast } from "../../../actions/status";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  UndoOutlined,
} from "@ant-design/icons";

function Toast({ id, type, message, delay = 3000, undoAction }) {
  const dispatch = useDispatch();

  const barStyle = {
    animationDuration: `${delay}ms`,
  };

  const handleUndo = async () => {
    clearTimeout(toastTimeout);
    dispatch(removeToast(id));
    undoAction();
  };

  const toastTimeout = setTimeout(() => {
    dispatch(removeToast(id));
  }, delay);

  const handleRemove = () => dispatch(removeToast(id));

  return (
    <div className={`toast ${type}`}>
      {type === "success" && <CheckCircleOutlined />}
      {type === "error" && <CloseCircleOutlined />}
      <span>{message}</span>
      <CloseOutlined onClick={handleRemove} />
      {undoAction && <UndoOutlined onClick={handleUndo} />}
      <div className="bar" style={barStyle} />
    </div>
  );
}

export default Toast;
