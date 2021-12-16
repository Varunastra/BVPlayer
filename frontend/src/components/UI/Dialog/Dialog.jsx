import React from "react";
import { ModalWrapper } from "../../containers/ModalWrapper";
import Button from "../Button/Button";
import "./Dialog.scss";

function Dialog({ title, children, onSave, open, handleClose, handleEdit }) {
  let controls = [];

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      onSave();
    }
  };

  if (handleEdit) {
    controls.push(<Button onClick={handleEdit} key={1}>Edit</Button>);
  }

  if (onSave) {
    controls.push(<Button onClick={onSave} key={2}>Save</Button>);
  }
  
  if (handleClose) {
    controls.push(<Button onClick={handleClose} key={3}>Cancel</Button>);
  }

  return (
    <>
      {open && (
        <ModalWrapper onToggleModal={handleClose}>
          <div
            className="dialog"
            onClick={(e) => e.stopPropagation()}
            onKeyUp={handleSubmit}
          >
            <div className="dialog-title">{title}</div>
            <div className="dialog-content">{children}</div>
            <div className="dialog-controls">{controls}</div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
}

export default Dialog;
