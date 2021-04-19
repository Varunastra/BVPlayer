import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { fetchPlaylist } from "../actions/playlist";
import PlaylistHeader from "../components/Playlists/PlaylistHeader";
import defaultPoster from "../images/poster.svg";

const fakeData = {
  poster: defaultPoster,
  name: "Title 1",
  tracks: [
    {
      name: "Sample 1",
      poster: defaultPoster,
      author: "Author 1",
    },
    {
      name: "Sample 2",
      poster: defaultPoster,
      author: "Author 2",
    },
  ],
};

export function Playlists() {
  const dispatch = useDispatch();
  const { id } = useLocation();
  const playlist = useSelector((state) => state.playlists.current);

  useEffect(() => {
    dispatch(fetchPlaylist(id));
  }, [dispatch, id]);

  return (
    <div className="playlist-view">
      <PlaylistHeader
        name={playlist.name}
        tracks={playlist.tracks}
      />
      <div className="tracks">
        {fakeData.tracks.map((track, i) => (
          <div className="track" key={i}>
            <span className="count">{i + 1}</span>
            <img src={track.poster} alt={track.name} className="poster" />
            <section className="info">
              <span className="name">{track.name}</span>
              <span className="author">{track.author}</span>
            </section>
            <span>{track.time}</span>
          </div>
        ))}
      </div>
      <div className="actions">
        <PlusCircleFilled className="add-track" />
        <DeleteOutlined className="remove-playlist" />
      </div>
    </div>
  );
}

export default Playlists;
