export function setTrack(track) {
    return { type: "SET_TRACK", payload: track };
}

export function nextTrack() {
    return { type: "NEXT_TRACK" };
}

export function prevTrack() {
    return { type: "NEXT_TRACK" };
}