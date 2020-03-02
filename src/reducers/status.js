const initialState = { currentTime: 0, isPlaying: false, duration: 0, isSeeking: false };

export function status(state = initialState, action) {
    switch (action.type) {
        case "SET_TIME":
            return { ...state, currentTime: action.payload };
        case "SET_PLAYING":
            if (action.payload) {
                return { ...state, isPlaying: action.payload }
            }
            return { ...state, isPlaying: !state.isPlaying };
        case "SET_DURATION":
            return { ...state, duration: action.payload };
        case "SET_SEEKING":
            return { ...state, isPlaying: false, isSeeking: action.payload };
        default:
            return state;
    }
}