import React from "react";
import { useTitle } from "../hooks/useTitle";
import notFound from "../images/404.svg";

function NotFound() {
  useTitle("Page not exist");

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
