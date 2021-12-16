import React, { useState } from "react";
import "./Spinner.scss";
import { useEffect } from "react";

export function Spinner({ isLoading, timeout = 200 }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => setIsReady(isLoading), timeout);
    return () => clearTimeout(timerId);
  }, [timeout, isLoading]);
  return (
    <>
      {isReady && (
        <div className="spinner">
          <div className="container">
            <div className="circle">
              <div />
              <div />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
