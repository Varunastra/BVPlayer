const initialState = {
    playlists: [{
        id: 1,
        name: "Maidan",
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