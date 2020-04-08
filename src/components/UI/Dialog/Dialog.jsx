import React from "react";
import { ModalWrapper } from "../../ModalWrapper";
import "./Dialog.scss";
import Button from "../Button/Button";

function Dialog({ title, children, variant, onSave, open, handleClose }) {
    let controls = <></>;

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
            break;
    }

    return (
        <>
            {open && (
                <ModalWrapper onToggleModal={handleClose}>
                    <div className="dialog" onClick={e => e.stopPropagation()}>
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
