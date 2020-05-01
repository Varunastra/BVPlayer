import React from "react";
import "./Button.scss";

function Button({ type, onClick, children, variant }) {
    if (!variant) {
        variant = "outline";
    }

    return (
        <button type={type} onClick={onClick} className={`button ${variant}`}>
            {children}
        </button>
    );
}

export default Button;
