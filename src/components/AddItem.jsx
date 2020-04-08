import React from "react";

function AddItem({ onAdd, title }) {
    return (
        <div className="add-item" onClick={onAdd}>
            <span>
                <i className="fa fa-plus" />
            </span>
            <span className="add-item-text">{title}</span>
        </div>
    );
}

export default AddItem;
