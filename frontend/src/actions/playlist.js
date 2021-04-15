import { getPlaylist } from "../api/playlist";

export function setTrack(track) {
  return { type: "SET_TRACK", payload: track };
}

export function nextTrack() {
  return { type: "NEXT_TRACK" };
}

export function prevTrack() {
  return { type: "PREV_TRACK" };
}

export function fetchTracks(id) {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_TRACKS_START" });
    try {
      const playlistId = id ? id : getState().playlists.current.id;
      const { tracks } = await getPlaylist(playlistId);
      dispatch({ type: "FETCH_TRACKS_SUCCESS", payload: tracks });
    } catch (e) {
      dispatch({ type: "FETCH_TRACKS_ERROR", error: e.message });
    }
  };
}

export function updatePlaying(track) {
  return { type: "UPDATE_PLAYING", payload: track };
}
