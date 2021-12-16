import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTrack, updateTrack, removeGenre, addGenre, rateTrack } from "../api/playlist";
import { useState } from "react";
import defaultPoster from "../images/poster.svg";
import Genre from "../components/containers/Genre";
import { useSelector, useDispatch } from "react-redux";
import EditableText from "../components/UI/EditableText/EditableText";
import AddGenre from "../components/AddGenre";
import Button from "../components/UI/Button/Button";
import FileInput from "../components/UI/FileInput/FileInput";
import { setTrack, updatePlaying } from "../actions/playlist";
import { setIsPlaying } from "../actions/status";
import { Spinner } from "../components/UI/Spinner/Spinner";
import Dialog from "../components/UI/Dialog/Dialog";
import { Playlists } from "../components/Playlists/Playlists";
import { fetchPlaylists } from "../actions/playlists";
import { makeToast } from "../toasts";
import {
  EditOutlined,
  FileImageOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  StopOutlined
} from "@ant-design/icons";
import { useTitle } from "../hooks/useTitle";

function Track() {
  const { id } = useParams();
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(true);
  const [isAddPlaylistClicked, setIsAddPlaylistClicked] = useState(false);

  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [genres, setGenres] = useState(null);
  const [lyrics, setLyrics] = useState(null);
  const [poster, setPoster] = useState(null);
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState(-1);
  const [src, setSrc] = useState(null);
  const [prevState, setPrevState] = useState(null);

  useTitle(title || '');

  const isCurrentUser = profile && !isUpdating && profile.id === userId;

  useEffect(() => {
    async function fetchTrack() {
      const {
        title,
        artist,
        genres,
        lyrics,
        poster,
        UserId,
        rating,
        src,
      } = await getTrack({ id });
      setTitle(title);
      setAuthor(artist);
      setPoster(poster);
      setGenres(genres);
      setUserId(UserId);
      setLyrics(lyrics);
      setSrc(src);
      setRating(rating);
      setIsUpdating(false);
      setPrevState({
        title,
        artist,
        genres,
        lyrics,
        poster,
        UserId,
        rating,
        src,
        id: parseInt(id),
      });
    }
    if (isUpdating) {
      fetchTrack();
    }
  }, [id, isUpdating]);

  useEffect(() => {
    setIsUpdating(true);
  }, [id]);

  const editTrack = () => {
    setIsEditable(!isEditable);
  };

  const saveTrackChanges = async (state) => {
    const { message } = await updateTrack(state);
    dispatch(updatePlaying({ id: parseInt(id), title, artist: author, poster }));
    setIsEditable(false);
    setIsUpdating(true);
    return message;
  };

  const saveChanges = async () => {
    const message = await saveTrackChanges({
      title,
      author,
      ...(lyrics && { lyrics }),
      id: parseInt(id),
    });
    makeToast({
      undoAction: () => saveTrackChanges(prevState),
      message,
    });
  };

  const uploadPoster = async (newPoster) => {
    const { message } = await updateTrack({ poster: newPoster, id });
    dispatch(updatePlaying({ id: parseInt(id), poster }));
    setIsUpdating(true);
    makeToast({
      message,
      undoAction: async () => {
        await updateTrack({ poster, id });
        dispatch(updatePlaying({ id: parseInt(id), poster }));
        setIsUpdating(true);
      },
    });
  };

  const handlePlay = () => {
    dispatch(
      setTrack({ id: parseInt(id), title, artist: author, genres, lyrics, poster, src })
    );
    dispatch(setIsPlaying(true));
  };

  const removeGenreAction = async (oldGenre, showToast = true) => {
    const { message } = await removeGenre({ genre: oldGenre, trackId: id });
    setGenres(genres.filter((genre) => genre.id !== oldGenre.id));
    if (showToast)
      makeToast({
        message,
        undoAction: () => {
          createGenreAction(oldGenre, false);
        },
      });
  };

  const createGenreAction = async (genre, showToast = true) => {
    const { id: createdId, message } = await addGenre({ genre, trackId: id });
    setGenres((genres) => [...genres, { ...genre, id: createdId }]);
    if (showToast)
      makeToast({
        message,
        undoAction: () => {
          removeGenreAction({ ...genre, id: createdId }, false);
        },
      });
  };

  const handleAdd = () => {
    dispatch(fetchPlaylists("me"));
    setIsAddPlaylistClicked(true);
  };

  const onAddMessage = ({ text, isError }) => {
    if (isError) {
      makeToast({ message: text, type: "error" });
    } else {
      makeToast({ message: text, type: "success" });
      setIsAddPlaylistClicked(false);
    }
  };

  const handleAddPlaylistClose = () => {
    setIsAddPlaylistClicked(false);
  };

  const handleLike = async () => {
    await rateTrack({ trackId: id, rating: rating > 0 ? -1 : 1 });
    setRating(rating > 0 ? -1 : 1);
  };

  const handleDislike = async () => {
    await rateTrack({ trackId: id, rating: 0 });
    setRating(0);
  }

  return (
    <>
      <div className="track-full">
        <Spinner isLoading={isUpdating} />
        {!isUpdating && (
          <>
            <div className="track-info">
              <div className="poster" alt="Poster">
                {isEditable && (
                  <FileInput handleUpload={uploadPoster}>
                    <div className="upload-poster">
                      <FileImageOutlined />
                    </div>
                  </FileInput>
                )}
                <img
                  src={poster || defaultPoster}
                  className={isEditable ? "semi-visible" : ""}
                  alt="Poster"
                />
                <div className="actions">
                  {isCurrentUser && <EditOutlined onClick={editTrack} />}
                  <PlayCircleOutlined onClick={handlePlay} />
                  <PlusOutlined onClick={handleAdd} />
                  <button className={`like-button ${rating > 0 ? 'liked' : ''}`} onClick={handleLike} />
                  <StopOutlined onClick={handleDislike} />
                </div>
              </div>
              <div className="track-header">
                <div className="title">
                  <EditableText
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    isEditable={isEditable}
                  />
                </div>
                <div className="author">
                  <EditableText
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    isEditable={isEditable}
                  />
                </div>
                <div className="genres">
                  {genres &&
                    genres.map((genre) => (
                      <Genre
                        genre={genre}
                        isEditable={isEditable}
                        handleRemove={removeGenreAction}
                        key={genre.id}
                      />
                    ))}
                  {isEditable && <AddGenre handleCreate={createGenreAction} />}
                </div>
              </div>
            </div>
            <div className="lyrics">
              <h2>Lyrics</h2>
              <div className="lyrics-text">
                <EditableText
                  value={lyrics || ""}
                  onChange={(e) => setLyrics(e.target.value)}
                  isEditable={isEditable}
                  defaultValue="Lyrics are not attached"
                  areaStyle={{ padding: "10px", minHeight: "250px" }}
                />
              </div>
            </div>
            <div className="controls">
              {isEditable && <Button onClick={saveChanges}>Save</Button>}
              {isEditable && (
                <Button onClick={() => setIsEditable(false)}>Cancel</Button>
              )}
            </div>
          </>
        )}
      </div>
      <Dialog
        open={isAddPlaylistClicked}
        title="Select playlist"
        handleClose={handleAddPlaylistClose}
      >
        <Playlists
          trackToAdd={{ id }}
          onAddMessage={onAddMessage}
          style={{ maxHeight: "250px", margin: 0, minWidth: "200px" }}
        />
      </Dialog>
    </>
  );
}

export default Track;
