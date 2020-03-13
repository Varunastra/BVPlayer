const initialState = {
    currentTime: 0, isPlaying: false, duration: 0, isSeeking: false
};

export function status(state = initialState, action) {
    switch (action.type) {
        case "SET_TIME":
            return { ...state, currentTime: action.payload };
        case "SET_PLAYING":
            return { ...state, isPlaying: action.payload };
        case "SET_DURATION":
            return { ...state, duration: action.payload };
        case "SET_SEEKING":
            return { ...state, isSeeking: action.payload };
        default:
            return state;
    }
}