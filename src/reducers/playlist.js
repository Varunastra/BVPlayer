const initialState = {
    tracks: [{
        id: 0,
        title: "Slava ukraine",
        author: "Patau",
        src: process.env.PUBLIC_URL + "./tracks/1.mp3",
        poster: process.env.PUBLIC_URL + "./posters/1.jpg"
    }, {
        id: 1,
        title: "Fear Inoculum",
        author: "Tool",
        src: process.env.PUBLIC_URL + "./tracks/2.mp3",
        poster: process.env.PUBLIC_URL + "./posters/2.jpg"
    }],
    track: {
        title: "Sample track title",
        author: "Author",
        poster: process.env.PUBLIC_URL + "./posters/1.jpg"
    },
    trackIndex: 0
};

export function playlist(state = initialState, action) {
    switch (action.type) {
        case "FETCH_TRACKS_START":
            return state;
        case "FETCH_TRACKS_SUCCESS":
            return state;
        case "FETCH_TRACKS_ERROR":
            return state;
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