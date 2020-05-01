import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayTime, setDuration, setSeeking } from "../../actions/status";
import { usePrevious } from "../../hooks/usePrevious";
import { nextTrack } from "../../actions/playlist";
import { AudioRef } from "../AudioRef";

export function Player() {
    const track = useSelector((state) => state.playlist.track.src);
    const volume = useSelector((state) => state.status.volume);

    const isPlaying = useSelector((state) => state.status.isPlaying);
    const currentTime = useSelector((state) => state.status.currentTime);
    const isSeeking = useSelector((state) => state.status.isSeeking);

    const dispatch = useDispatch();
    const audio = AudioRef;
    const waitForSeek = useRef(false);

    const prevTrack = usePrevious(track);

    useEffect(() => {
        async function loadTrack() {
            if (prevTrack !== track) {
                await audio.current.load();
                if (isPlaying) {
                    await audio.current.play();
                }
            }
        }
        loadTrack();
    });

    useEffect(() => {
        const audioElem = audio.current;

        const updateListener = audioElem.addEventListener("timeupdate", (e) => {
            if (!waitForSeek.current) {
                dispatch(setPlayTime(e.target.currentTime));
            } else {
                waitForSeek.current = false;
            }
        });

        const trackEndListener = audioElem.addEventListener("ended", (e) => {
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
    }, [dispatch, audio]);

    useEffect(() => {
        async function setPlayerIsPlaying() {
            isPlaying
                ? await audio.current.play()
                : await audio.current.pause();
        }
        setPlayerIsPlaying();
    }, [isPlaying, audio]);

    useEffect(() => {
        async function setAudioTime() {
            if (isSeeking) {
                audio.current.currentTime = currentTime;
                dispatch(setSeeking(false));
                waitForSeek.current = true;
            }
        }
        setAudioTime();
    }, [isSeeking, currentTime, dispatch, audio]);

    useEffect(() => {
        audio.current.volume = volume / 100;
    }, [volume, audio]);

    return (
        <audio
            src={track && `${process.env.REACT_APP_URL}${track}`}
            ref={audio}
            crossOrigin="anonymous"
        ></audio>
    )
}
