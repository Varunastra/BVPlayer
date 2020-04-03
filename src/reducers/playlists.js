const initialState = {
    all: [{
        id: 1,
        name: "Maidan",
    },
    {
        id: 2,
        name: "SlavaUkraine"
    },
    {
        id: 3,
        name: "Trouble"
    }],
    current: {
        id: 1,
        name: "Maidan",
    },
    isOpen: false
};

export function playlists(state = initialState, action) {
    switch (action.type) {
        case "FETCH_PLAYLISTS_START":
            break;
        case "FETCH_PLAYLISTS_ERROR":
            break;
        case "FETCH_PLAYLISTS_SUCCESS":
            break;
        case "SET_PLAYLIST":
            return { ...state, current: action.payload };
        case "SET_IS_OPEN": {
            return { ...state, isOpen: !state.isOpen };
        }
        default:
            return state;
    }
}