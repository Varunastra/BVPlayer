export function setPlayTime(time) {
    return { type: "SET_TIME", payload: time };
}

export function setIsPlaying(status) {
    return { type: "SET_PLAYING", payload: status };
}

export function setDuration(time) {
    return { type: "SET_DURATION", payload: time };
}

export function setIsSeeking(time) {
    return { type: "SET_SEEKING", payload: time };
}