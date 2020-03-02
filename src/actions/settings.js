export function setAudioSource(src) {
    return { type: "SET_SOURCE", payload: src };
}

export function setVolume(value) {
    return { type: "SET_VOLUME", payload: value };
}