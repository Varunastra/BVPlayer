import React from "react";
import { createPortal } from "react-dom";

export function ModalWrapper({ children, onToggleModal }) {
  return createPortal(
    <div className="modal" onClick={onToggleModal}>
      {children}
    </div>,
    document.getElementById("modal-root")
  );
}
