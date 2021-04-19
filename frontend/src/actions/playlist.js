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

export function fetchPlaylist(id) {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_PLAYLIST_START" });
    try {
      const playlistId = id ? id : getState().playlists.current.id;
      const playlist = await getPlaylist(playlistId);
      dispatch({ type: "FETCH_PLAYLIST_SUCCESS", payload: playlist });
    } catch (e) {
      dispatch({ type: "FETCH_PLAYLIST_ERROR", error: e.message });
    }
  };
}

export function updatePlaying(track) {
  return { type: "UPDATE_PLAYING", payload: track };
}
