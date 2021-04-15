const initialState = {
  all: [],
  current: null,
  isOpen: false,
  error: null,
};

export function playlists(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PLAYLISTS_START":
      return { ...state, isLoading: true };
    case "FETCH_PLAYLISTS_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_PLAYLISTS_SUCCESS":
      return { ...state, isLoading: false, all: action.payload, error: null };
    case "SET_PLAYLIST":
      return { ...state, current: action.payload };
    case "SET_IS_OPEN": {
      return { ...state, isOpen: !state.isOpen };
    }
    default:
      return state;
  }
}
