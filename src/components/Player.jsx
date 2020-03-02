import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAudioSource } from "../actions/settings";
import {
    setPlayTime,
    setDuration,
    setIsSeeking,
    setIsPlaying
} from "../actions/status";
import { PlayerControls } from "./PlayerControls";
import { Visualizer } from "./Visualizer";
import { ProgressBar } from "./ProgressBar";

export function Player() {
    const source = useSelector(state => state.settings.source);
    const volume = useSelector(state => state.settings.volume);

    const isPlaying = useSelector(state => state.status.isPlaying);
    const isSeeking = useSelector(state => state.status.isSeeking);
    const currentTime = useSelector(state => state.status.currentTime);

    const dispatch = useDispatch();
    const audio = useRef(null);

    useEffect(() => {
        const audioElem = audio.current;

        dispatch(setAudioSource(process.env.PUBLIC_URL + "./test.mp3"));

        const updateListener = audioElem.addEventListener("timeupdate", e => {
            dispatch(setPlayTime(e.target.currentTime));
        });

        const metadataLoadListener = audioElem.addEventListener(
            "loadedmetadata",
            () => {
                dispatch(setDuration(audioElem.duration));
            }
        );

        return () => {
            audioElem.removeEventListener("timeupdate", updateListener);
            audioElem.removeEventListener(
                "loadedmetadata",
                metadataLoadListener
            );
        };
    }, [dispatch]);

    useEffect(() => {
        isPlaying ? audio.current.play() : audio.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying) {
            audio.current.currentTime = currentTime;
        }
    }, [isPlaying, currentTime]);

    useEffect(() => {
        audio.current.volume = volume / 100;
    }, [volume]);

    return (
        <article className="player-container">
            <audio src={source} ref={audio}></audio>
            <Visualizer audio={audio} />
            <PlayerControls />
            <ProgressBar />
        </article>
    );
}
