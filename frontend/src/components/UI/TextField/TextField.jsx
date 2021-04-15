import React from "react";
import "./TextField.scss";

function TextField({ type, value, onChange, placeholder }) {
  return (
    <div className="textfield">
      <input
        className="textfield__input"
        type={type}
        value={value || ""}
        onChange={onChange}
      />
      <label className="textfield__label">{placeholder}</label>
    </div>
  );
}

export default TextField;
