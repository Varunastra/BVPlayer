import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayTime, setDuration, setSeeking } from "../../actions/status";
import { PlayerControls } from "./PlayerControls";
import { Visualizer } from "./Visualizer";
import { PlayerProgressBar } from "./PlayerProgressBar";
import { usePrevious } from "../../usePrevious";
import { nextTrack } from "../../actions/playlist";

export function Player() {
    const track = useSelector(state => state.playlist.track);
    const volume = useSelector(state => state.settings.volume);

    const isPlaying = useSelector(state => state.status.isPlaying);
    const currentTime = useSelector(state => state.status.currentTime);
    const isSeeking = useSelector(state => state.status.isSeeking);

    const dispatch = useDispatch();
    const audio = useRef(null);
    const waitForSeek = useRef(false);

    const prevTrack = usePrevious(track);

    useEffect(() => {
        if (prevTrack !== track) {
            audio.current.load();
            if (isPlaying) {
                audio.current.play();
            }
        }
    });

    useEffect(() => {
        const audioElem = audio.current;

        const updateListener = audioElem.addEventListener("timeupdate", e => {
            if (!waitForSeek.current) {
                dispatch(setPlayTime(e.target.currentTime));
            } else {
                waitForSeek.current = false;
            }
        });

        const trackEndListener = audioElem.addEventListener("ended", e => {
            dispatch(nextTrack());
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
            audioElem.removeEventListener("ended", trackEndListener);
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

    const playerRender = (
        <div className="player">
            <audio src={track.src} ref={audio}></audio>
            <Visualizer audio={audio} />
            <div className="control-block">
                <img src={track.poster} alt="poster" className="poster" />
                <div>
                    <strong>{track.author}</strong> - {track.title}
                    <PlayerControls />
                </div>
            </div>
            <PlayerProgressBar />
        </div>
    );

    return <article className="player-container">{playerRender}</article>;
}
