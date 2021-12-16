import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Track } from "./Track";
import { fetchPlaylist } from "../../actions/playlist";
import { setIsOpen } from "../../actions/playlists";
import { Spinner } from "../UI/Spinner/Spinner";
import playlistLogo from "../../images/playlist.svg";
import PlaylistEdit from "./PlaylistEdit";
import DuplicatePlaylist from "../Playlists/DuplicatePlaylist";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";

export function Tracks() {
  const tracks = useSelector((state) => state.playlist.tracks);
  const playlist = useSelector((state) => state.playlists.current);
  const isLoading = useSelector((state) => state.playlist.isLoading);
  const dispatch = useDispatch();
  const [isPlaylistEditable, setIsPlaylistEditable] = useState(false);

  useEffect(() => {
    dispatch(fetchPlaylist());
  }, [playlist, dispatch]);

  const onBackClicked = () => {
    dispatch(setIsOpen());
  };

  const handlePlaylistEdit = () => {
    setIsPlaylistEditable(!isPlaylistEditable);
  };

  return (
    <div className="tracks">
      <div className="tracks-header">
        <div className="tracks-playlist">
          <img className="playlist-icon" src={playlistLogo} alt="Playlist" />
          <div className="name">
            <PlaylistEdit
              isEditable={isPlaylistEditable}
              setIsEditable={setIsPlaylistEditable}
              playlist={playlist}
            />
          </div>
        </div>
        <div className="controls">
          <EditOutlined onClick={handlePlaylistEdit} />
          <ArrowLeftOutlined onClick={onBackClicked} />
        </div>
      </div>
      <div className="container">
        <Spinner isLoading={isLoading} />
        {tracks.map((track) => (
          <Track track={track} key={track.id} />
        ))}
        {!isLoading && <DuplicatePlaylist />}
      </div>
    </div>
  );
}
