import React from "react";
import { useSelector } from "react-redux";
import { Player } from "./components/Player/Player";
import { PlayerBar } from "./components/Player/PlayerBar";
import ToastContainer from "./components/UI/Toast/ToastContainer";

function MiddleWares() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      {isAuthenticated && (
        <>
          <Player /> <PlayerBar />
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default MiddleWares;
