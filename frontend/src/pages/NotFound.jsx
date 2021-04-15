import React from "react";
import notFound from "../images/404.svg";

function NotFound() {
  return (
    <>
      <div className="not-found">
        <h2>Sorry, but nothing found on this page</h2>
        <img src={notFound} alt="Not found" />
      </div>
    </>
  );
}

export default NotFound;
