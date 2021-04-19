import { PlayCircleFilled } from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setPlaylist } from "../../actions/playlists";
import defaultPoster from "../../images/poster.svg";

function PlaylistMod({ playlist }) {
  const { id, name, poster, tracks } = playlist;

  const history = useHistory();
  const dispatch = useDispatch();

  const onPlaylistClick = () => {
    history.push(`/playlists/${id}`);
  };

  const onPlayClick = (e) => {
    e.stopPropagation();
    dispatch(setPlaylist(playlist));
  };

  // const onAddTrack = async () => {
  //   if (trackToAdd) {
  //     try {
  //       const { message } = await addTrack({
  //         trackId: trackToAdd.id,
  //         playlistId: id,
  //       });
  //       handleAddSuccess(message);
  //     } catch (e) {
  //       handleAddError(e.message);
  //     }
  //   } else {
  //     dispatch(setPlaylist(playlist));
  //     dispatch(setIsOpen());
  //   }
  // };

  // const handleDelete = async (e) => {
  //   e.stopPropagation();
  //   const playlist = await getPlaylist(id);
  //   const tracks = playlist.tracks.map((track) => track.id);
  //   const { message } = await removePlaylist(id);
  //   dispatch(fetchPlaylists("me"));
  //   makeToast({
  //     message,
  //     undoAction: async () => {
  //       await createPlaylist({ ...playlist, tracks });
  //       dispatch(fetchPlaylists("me"));
  //     },
  //   });
  // };

  return (
    <div className="playlist-mod" onClick={onPlaylistClick}>
      <img src={poster || defaultPoster} className="photo" alt={name} />
      <div className="info">
        <div className="title">{name}</div>
        <div className="songs-titles">
          {tracks.length
            ? tracks
                .slice(0, 5)
                .map((song) => song.title)
                .join(", ")
            : "Playlist is empty"}
        </div>
      </div>
      <div className="play-container" onClick={onPlayClick}>
        <PlayCircleFilled />
      </div>
    </div>
  );
}

export default PlaylistMod;
