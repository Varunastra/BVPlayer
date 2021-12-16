import {
  DeleteOutlined,
  PlusCircleFilled,
  PlayCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { setTrack } from "../actions/playlist";
import { calculateTime } from "../helpers/calculateTime";
import PlaylistHeader from "../components/Playlists/PlaylistHeader";
import {
  removePlaylist,
  getPlaylist,
  createPlaylist,
  rateTrack
} from "../api/playlist";
import { makeToast } from "../toasts";
import { setCurrentPlaylist } from "../actions/playlist";
import UploadTrack from "../components/Tracks/UploadTrack";
import { setIsPlaying } from "../actions/status";
import { useTitle } from "../hooks/useTitle";

const Track = ({ onLike, onDislike, onPlay, track, index }) => (<div className="track" key={track.id}>
  <div className="play">
    <PlayCircleOutlined className="play-circle" onClick={() => onPlay(track)} />
    <span className="count">{index + 1}</span>
  </div>
  <img src={track.poster} alt={track.name} className="poster" />
  <section className="info">
    <Link to={`/tracks/${track.id}`}>
      <span className="name">{track.title}</span>
    </Link>
    <span className="author">{track.artist}</span>
  </section>
  <section className="controls">
    <span className="duration">
      {calculateTime(track.duration)}
      <ClockCircleOutlined style={{ padding: '0 8px', fontSize: '12px' }} />
    </span>
    <StopOutlined className={`dislike-button ${track.rating === 0 ? 'disliked' : ''}`} onClick={() => onDislike(track)} />
    <button className={`like-button ${(track.rating > 0 || !('rating' in track)) ? 'liked' : ''}`} onClick={() => onLike(track)} />
  </section>
</div>);

export function Playlists() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({ tracks: [], name: '', poster: null });
  const currentPlaylist = useSelector(state => state.playlist.playlist);

  useTitle(playlist.name);

  const [uploadTrackModal, setUploadTrackModal] = useState(false);

  const toggleTrackModal = () => setUploadTrackModal(!uploadTrackModal);

  const onUploadModalClose = () => {
    toggleTrackModal();
    fetchPlaylist();
  }

  const fetchPlaylist = useCallback(async () => {
    const playlist = await getPlaylist(id);
    setPlaylist(playlist);
  }, [id]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    const playlist = await getPlaylist(id);
    const tracks = playlist.tracks.map((track) => track.id);
    const { message } = await removePlaylist(id);
    fetchPlaylist();
    makeToast({
      message,
      undoAction: async () => {
        await createPlaylist({ ...playlist, tracks });
        fetchPlaylist();
      },
    });
  };

  const onPlay = (track) => {
    if (currentPlaylist !== playlist) {
      dispatch(setCurrentPlaylist(playlist));
    }
    dispatch(setTrack(track));
    dispatch(setIsPlaying(true));
  };

  const onLike = async (track) => {
    await rateTrack({ trackId: track.id, rating: track.rating > 0 ? -1 : 1 });
    fetchPlaylist();
  };

  const onDislike = async (track) => {
    await rateTrack({ trackId: track.id, rating: 0 });
    fetchPlaylist();
  }

  return (
    <div className="playlist-view">
      <PlaylistHeader
        {...playlist}
      />
      <div className="tracks">
        {playlist.tracks.map((track, i) =>
          <Track track={track} index={i} key={track.id} onPlay={onPlay} onLike={onLike} onDislike={onDislike} />
        )}
      </div>
      <div className="actions">
        <PlusCircleFilled className="add-track" onClick={toggleTrackModal} />
        <DeleteOutlined className="remove-playlist" onClick={handleDelete} />
      </div>
      <UploadTrack isOpen={uploadTrackModal} onClose={onUploadModalClose} />
    </div>
  );
}

export default Playlists;
