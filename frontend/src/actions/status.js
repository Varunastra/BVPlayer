export function setPlayTime(time) {
    return { type: "SET_TIME", payload: time };
}

export function setIsPlaying(status) {
    return { type: "SET_PLAYING", payload: status };
}

export function setDuration(time) {
    return { type: "SET_DURATION", payload: time };
}

export function setSeeking(status) {
    return { type: "SET_SEEKING", payload: status };
}

export function setVolume(value) {
    return { type: "SET_VOLUME", payload: value };
}

export function setBuffer(buffer) {
    return { type: 'SET_BUFFER', payload: buffer };
}

export function addToast(toast) {
    return { type: "ADD_TOAST", payload: toast };
}

export function removeToast(id) {
    return { type: "REMOVE_TOAST", payload: id };
}
