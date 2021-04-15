import React from "react";
import { ModalWrapper } from "../../containers/ModalWrapper";
import Button from "../Button/Button";
import "./Dialog.scss";

function Dialog({ title, children, variant, onSave, open, handleClose }) {
    let controls = <></>;

    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            onSave();
        }
    };

    switch (variant) {
        case "form":
            controls = (
                <>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onSave}>Save</Button>
                </>
            );
            break;
        default:
            controls = (
                <>
                    <Button onClick={handleClose}>Cancel</Button>
                </>
            )
            break;
    }

    return (
        <>
            {open && (
                <ModalWrapper onToggleModal={handleClose}>
                    <div className="dialog" onClick={e => e.stopPropagation()} onKeyUp={handleSubmit}>
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
