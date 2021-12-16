import React from "react";
import { useSelector } from "react-redux";
import { Player } from "./components/Player/Player";
import ToastContainer from "./components/UI/Toast/ToastContainer";

function MiddleWares() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      {isAuthenticated && (
        <>
          <Player />
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default MiddleWares;
