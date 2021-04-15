import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import "./Error.scss";

function ErrorMessage({ error, hasIcon }) {
  return (
    <>
      {error && (
        <div className="error-message">
          {hasIcon && <CloseCircleOutlined />}
          <div className="error-text">{error}</div>
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
