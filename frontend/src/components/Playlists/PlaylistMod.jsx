import { PlayCircleTwoTone } from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router";
// import { useDispatch } from "react-redux";
// import { fetchPlaylist, setTrack } from "../../actions/playlist";
// import { setIsPlaying } from "../../actions/status";
import defaultPoster from "../../images/poster.svg";

function PlaylistMod({ playlist, description }) {
  const { id, name, poster, tracks = [] } = playlist;

  const history = useHistory();
  // const dispatch = useDispatch();

  const onPlaylistClick = () => {
    history.push(`/playlists/${id}`);
  };

  const onPlayClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="playlist-mod" onClick={onPlaylistClick}>
      <div className="photo">
        <img src={poster || defaultPoster} alt={name} />
      </div>
      <div className="info">
        <div className="title">{name}</div>
        <div className="description">{description ||
          <div className="songs-titles">
            {tracks.length
              ? tracks
                .slice(0, 5)
                .map((song) => song.title)
                .join(", ")
              : "Playlist is empty"}
          </div>}
        </div>
      </div>
      <div className="play-container" onClick={onPlayClick}>
        <PlayCircleTwoTone twoToneColor="#1db954" />
      </div>
    </div>
  );
}

export default PlaylistMod;
