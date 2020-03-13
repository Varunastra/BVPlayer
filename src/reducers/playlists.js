const initialState = {
    playlists: [{
        id: 1,
        name: "Maidan",
    }
    ]
};

export function playlists(state = initialState, action) {
    switch (action.type) {
        case "FETCH_PLAYLISTS_START":
        case "FETCH_PLAYLISTS_ERROR":
        case "FETCH_PLAYLISTS_SUCCESS":
    }
}