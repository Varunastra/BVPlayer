import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayTime, setSeeking } from "../../actions/status";
import { calculateTime } from "../../helpers/calculateTime";

function PlayerProgressBar() {
  const currentTime = useSelector((state) => state.status.currentTime);
  const duration = useSelector((state) => state.status.duration);
  const dispatch = useDispatch();

  const isMouseDown = useRef(false);
  const [progress, setProgress] = useState(0);

  const fillPrecent = currentTime / duration;

  useEffect(() => {
    if (!isMouseDown.current) {
      setProgress(fillPrecent);
    }
  }, [fillPrecent]);

  const progressScaleStyle = {
    transform: `scaleX(${progress})`,
  };

  const getBarProgress = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.nativeEvent.clientX - rect.left;
    return x / rect.width;
  };

  const onMouseMove = useCallback((e) => {
    if (isMouseDown.current) {
      const current = getBarProgress(e);
      setProgress(current);
    }
  }, []);

  const onMouseDown = () => {
    isMouseDown.current = true;
  };

  const onMouseUp = useCallback(
    (e) => {
      const current = getBarProgress(e);
      dispatch(setSeeking(true));
      dispatch(setPlayTime(current * duration));
      isMouseDown.current = false;
    },
    [dispatch, duration]
  );

  const onMouseLeave = () => {
    isMouseDown.current = false;
  };

  return (
    <div className="player-progress">
      <div
        className="full-progress"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
      >
        <div className="current-progress" style={progressScaleStyle} />
      </div>
      <small className="start-time">{calculateTime(currentTime)}</small>
      <small className="end-time">{calculateTime(duration)}</small>
    </div>
  );
}

export default PlayerProgressBar;
