import React, { useEffect, useRef } from "react";
import { getBufferLength, getAudioBuffer } from "../../helpers/audioBuffer";

const Visualizer = React.memo(function Visualizer(props) {
    const audio = props.audio;
    const canvas = useRef(null);

    useEffect(() => {
        let requestId;

        function renderCanvas() {
            const buffer = getAudioBuffer(audio.current);

            let x = 0;
            const barPadding = 5;

            const { width, height } = canvas.current.getBoundingClientRect();

            canvas.current.width = width;
            canvas.current.height = height;
            const ctx = canvas.current.getContext("2d");

            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);

            const barWidth = (width / getBufferLength()) * 14;

            const setBarColor = (r, g, b) => {
                ctx.fillStyle = `rgb(${r},${g},${b})`;
            };

            const bars = width / (barWidth + barPadding);
            let barHeight;

            for (let i = 0; i < bars; i++) {
                barHeight = buffer[i] * 0.8;

                if (buffer[i] > 210) setBarColor(250, 0, 255);
                else if (buffer[i] > 200) setBarColor(250, 255, 0);
                else if (buffer[i] > 190) setBarColor(204, 255, 0);
                else if (buffer[i] > 180) setBarColor(0, 219, 131);
                else setBarColor(0, 199, 255);

                ctx.fillRect(x, height - barHeight, barWidth, barHeight);
                x += barWidth + barPadding;
            }
            requestId = requestAnimationFrame(renderCanvas);
        }
        renderCanvas();

        return () => {
            cancelAnimationFrame(requestId);
        };
    });

    return <canvas className="visualizer" ref={canvas}></canvas>;
});

export default Visualizer;
