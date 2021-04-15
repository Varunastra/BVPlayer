import uniqueId from "lodash.uniqueid";

const initialState = {
  currentTime: 0,
  isPlaying: false,
  duration: 0,
  isSeeking: false,
  volume: 5,
  toasts: [],
  buffer: null,
};

export function status(state = initialState, action) {
  switch (action.type) {
    case "SET_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_PLAYING":
      return {
        ...state,
        isPlaying: action.payload || !state.isPlaying,
      };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_SEEKING":
      return { ...state, isSeeking: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_BUFFER":
      return { ...state, buffer: action.payload };
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: uniqueId("toast") }],
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
}
