import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAudioSource } from "../actions/settings";
import { setPlayTime, setDuration, setSeeking } from "../actions/status";
import { PlayerControls } from "./PlayerControls";
import { Visualizer } from "./Visualizer";
import { ProgressBar } from "./ProgressBar";

export function Player() {
    const source = useSelector(state => state.settings.source);
    const volume = useSelector(state => state.settings.volume);

    const isPlaying = useSelector(state => state.status.isPlaying);
    const currentTime = useSelector(state => state.status.currentTime);
    const isSeeking = useSelector(state => state.status.isSeeking);

    const dispatch = useDispatch();
    const audio = useRef(null);
    const waitForSeek = useRef(false);

    useEffect(() => {
        const audioElem = audio.current;

        dispatch(setAudioSource(process.env.PUBLIC_URL + "./test.mp3"));

        const updateListener = audioElem.addEventListener("timeupdate", e => {
            if (!waitForSeek.current) {
                dispatch(setPlayTime(e.target.currentTime));
            } else {
                waitForSeek.current = false;
            }
        });

        const metadataLoadListener = audioElem.addEventListener(
            "loadedmetadata",
            () => {
                dispatch(setDuration(audioElem.duration));
            }
        );

        return () => {
            audioElem.removeEventListener(
                "loadedmetadata",
                metadataLoadListener
            );
            audioElem.removeEventListener("timeupdate", updateListener);
        };
    }, [dispatch]);

    useEffect(() => {
        async function setPlayerIsPlaying() {
            isPlaying
                ? await audio.current.play()
                : await audio.current.pause();
        }
        setPlayerIsPlaying();
    }, [isPlaying]);

    useEffect(() => {
        async function setAudioTime() {
            if (isSeeking) {
                audio.current.currentTime = currentTime;
                dispatch(setSeeking(false));
                waitForSeek.current = true;
            }
        }
        setAudioTime();
    }, [isSeeking, currentTime, dispatch]);

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
