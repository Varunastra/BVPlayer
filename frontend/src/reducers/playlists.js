const initialState = {
  all: [],
  recommendations: [],
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
    case "SET_IS_OPEN":
      return { ...state, isOpen: !state.isOpen };
    case "FETCH_RECOMMENDATIONS_START":
      return { ...state, isLoading: true };
    case "FETCH_RECOMMENDATIONS_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_RECOMMENDATIONS_SUCCESS":
      return { ...state, isLoading: false, all: action.payload, error: null };
    default:
      return state;
  }
}
