import React from "react";

function AddItem({ onAdd, title, icon = "plus" }) {
  return (
    <div className="add-item" onClick={onAdd}>
      <span>
        <i className={`fa fa-${icon}`} />
      </span>
      <span className="add-item-text">{title}</span>
    </div>
  );
}

export default AddItem;
