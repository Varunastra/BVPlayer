import { getUserPlaylists } from "../api/playlist";

export const setIsOpen = () => ({ type: "SET_IS_OPEN" });

export const fetchPlaylists = (id) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_PLAYLISTS_START" });
    const playlists = await getUserPlaylists(id);
    dispatch({ type: "FETCH_PLAYLISTS_SUCCESS", payload: playlists });
  } catch (e) {
    dispatch({ type: "FETCH_PLAYLISTS_ERROR", payload: e.message });
  }
};
