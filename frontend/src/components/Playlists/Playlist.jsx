import React from "react";
import { useDispatch } from "react-redux";
import {
  setPlaylist,
  setIsOpen,
  fetchPlaylists,
} from "../../actions/playlists";
import playlistLogo from "../../images/playlist.svg";
import {
  addTrack,
  removePlaylist,
  getPlaylist,
  createPlaylist,
} from "../../api/playlist";
import { makeToast } from "../../toasts";
import { DeleteOutlined } from "@ant-design/icons";

export function Playlist({
  playlist,
  trackToAdd,
  handleAddSuccess,
  handleAddError,
}) {
  const { name, id } = playlist;

  const dispatch = useDispatch();

  const onPlaylistClicked = async () => {
    if (trackToAdd) {
      try {
        const { message } = await addTrack({
          trackId: trackToAdd.id,
          playlistId: id,
        });
        handleAddSuccess(message);
      } catch (e) {
        handleAddError(e.message);
      }
    } else {
      dispatch(setPlaylist(playlist));
      dispatch(setIsOpen());
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const playlist = await getPlaylist(id);
    const tracks = playlist.tracks.map((track) => track.id);
    const { message } = await removePlaylist(id);
    dispatch(fetchPlaylists("me"));
    makeToast({
      message,
      undoAction: async () => {
        await createPlaylist({ ...playlist, tracks });
        dispatch(fetchPlaylists("me"));
      },
    });
  };

  return (
    <div className="playlist" onClick={onPlaylistClicked}>
      <img className="playlist-folder" src={playlistLogo} alt="Playlist" />
      <div className="container">{name}</div>
      <div className="playlist-controls">
        {!trackToAdd && <DeleteOutlined onClick={handleDelete} />}
      </div>
    </div>
  );
}
