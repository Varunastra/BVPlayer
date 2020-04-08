const initialState = {
    tracks: [],
    track: {
        title: "Sample track title",
        author: "Author",
        poster: null
    },
    trackIndex: 0,
    error: null
};

export function playlist(state = initialState, action) {
    switch (action.type) {
        case "FETCH_TRACKS_START":
            return { ...state, isLoading: true, tracks: [] };
        case "FETCH_TRACKS_SUCCESS":
            return { ...state, tracks: action.payload, isLoading: false };
        case "FETCH_TRACKS_ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "SET_TRACK":
            const newIndex = state.tracks.indexOf(action.payload);
            return { ...state, track: state.tracks[newIndex] };
        case "NEXT_TRACK":
            const nextIndex = state.trackIndex === state.tracks.length - 1 ?
                0 : state.trackIndex + 1;
            return { ...state, track: state.tracks[nextIndex], trackIndex: nextIndex };
        case "PREV_TRACK":
            const prevIndex = state.trackIndex === 0 ?
                state.tracks.length
                : state.trackIndex - 1;
            return { ...state, track: state.tracks[prevIndex], trackIndex: prevIndex };
        default:
            return state;
    }
}