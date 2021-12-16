import React from "react";
import { CloseOutlined } from "@ant-design/icons";

function Genre({ genre, handleRemove, isEditable }) {
  return (
    <div className="genre">
      {isEditable && <CloseOutlined onClick={() => handleRemove(genre)} />}
      {genre.name}
    </div>
  );
}

export default Genre;
