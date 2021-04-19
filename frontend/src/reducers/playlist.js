const initialState = {
  playlist: {
    tracks: [],
    title: null,
    poster: null,
  },
  track: {
    title: "Sample track title",
    author: "Author",
    poster: null,
  },
  trackIndex: 0,
  error: null,
};

export function playlist(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PLAYLIST_START":
      return { ...state, isLoading: true, playlist: initialState.playlist };
    case "FETCH_PLAYLIST_SUCCESS":
      return {
        ...state,
        playlist: action.payload,
        isLoading: false,
      };
    case "FETCH_PLAYLIST_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "SET_TRACK":
      let newIndex = state.playlist.tracks.findIndex(
        (track) => track.id === action.payload.id
      );
      if (newIndex === -1) {
        state.playlist.tracks.push(action.payload);
        newIndex = state.tracks.length - 1;
      }
      return { ...state, track: state.playlist.tracks[newIndex] };
    case "NEXT_TRACK":
      const nextIndex =
        state.trackIndex === state.playlist.tracks.length - 1
          ? 0
          : state.trackIndex + 1;
      if (state.playlist.tracks.length === 0) {
        return state;
      }
      return {
        ...state,
        track: state.playlist.tracks[nextIndex],
        trackIndex: nextIndex,
      };
    case "PREV_TRACK":
      const prevIndex =
        state.trackIndex === 0
          ? state.playlist.tracks.length - 1
          : state.trackIndex - 1;
      return {
        ...state,
        track: state.playlist.tracks[prevIndex],
        trackIndex: prevIndex,
      };
    case "UPDATE_PLAYING":
      const isCurrent = state.track.id === action.payload.id;
      if (isCurrent) {
        return { ...state, track: { ...state.track, ...action.payload } };
      }
      return state;
    default:
      return state;
  }
}
