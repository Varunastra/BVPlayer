import React from "react";
import { createPortal } from "react-dom";

export function ModalWrapper(props) {
    return createPortal(
        <div className="modal">
            <div className="modal-content">{props.children}</div>
        </div>,
        document.body
    );
}
