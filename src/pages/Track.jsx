import React from 'react';
import ContentWrapper from "../components/containers/ContentWrapper";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getTrack, updateTrack, removeGenre, addGenre } from '../api/playlist';
import { useState } from 'react';
import defaultPoster from "../images/poster.svg";
import Genre from '../components/containers/Genre';
import { useSelector, useDispatch } from 'react-redux';
import EditableText from '../components/UI/EditableText/EditableText';
import AddGenre from '../components/AddGenre';
import Button from '../components/UI/Button/Button';
import FileInput from '../components/UI/FileInput/FileInput';
import { setTrack, updatePlaying } from '../actions/playlist';
import { setIsPlaying, addToast } from '../actions/status';
import { Spinner } from '../components/UI/Spinner/Spinner';
import changePhoto from "../images/change-photo.svg";
import Dialog from '../components/UI/Dialog/Dialog';
import { Playlists } from '../components/Playlists/Playlists';
import { fetchPlaylists } from '../actions/playlists';

function Track() {
    const { id } = useParams();
    const profile = useSelector(state => state.user.profile);
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
    const [src, setSrc] = useState(null);

    const isCurrentUser = (profile && !isUpdating) && profile.id === userId;

    useEffect(() => {
        async function fetchTrack() {
            const { title, author, genres, lyrics, poster, UserId, src } = await getTrack({ id });
            setTitle(title);
            setAuthor(author);
            setPoster(poster);
            setGenres(genres);
            setUserId(UserId);
            setLyrics(lyrics);
            setSrc(src);
            setIsUpdating(false);
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

    const saveChanges = async () => {
        await updateTrack({ title, author, lyrics, id });
        dispatch(updatePlaying({ id: parseInt(id), title, author, poster }));
        setIsEditable(false);
    };

    const uploadPoster = async (newPoster) => {
        await updateTrack({ poster: newPoster, id });
        dispatch(updatePlaying({ id: parseInt(id), poster }));
        setIsUpdating(true);
    };

    const handlePlay = () => {
        dispatch(setTrack({ id: parseInt(id), title, author, genres, lyrics, poster, src }));
        dispatch(setIsPlaying(true));
    };

    const handleRemoveGenre = async (oldGenre) => {
        const { message } = await removeGenre({ genre: oldGenre, trackId: id });
        setGenres(genres.filter(genre => genre.id !== oldGenre.id));
        dispatch(addToast({ message, type: "success" }));
    }

    const handleAdd = () => {
        dispatch(fetchPlaylists("me"));
        setIsAddPlaylistClicked(true);
    };

    const onAddMessage = ({ text, isError }) => {
        if (isError) {
            dispatch(addToast({ message: text, type: "error" }));
        }
        else {
            dispatch(addToast({ message: text, type: "success" }));
            setIsAddPlaylistClicked(false);
        }
    };

    const handleAddPlaylistClose = () => {
        setIsAddPlaylistClicked(false);
    }

    const handleCreateGenre = async (genre) => {
        const { id: createdId, message } = await addGenre({ genre, trackId: id });
        setGenres([...genres, { ...genre, id: createdId }]);
        dispatch(addToast({ message, type: "success" }));
    };

    return (
        <ContentWrapper>
            <div className="track-full">
                <Spinner isLoading={isUpdating} />
                {!isUpdating && (
                    <>
                        <div className="track-info">
                            <div className="poster" alt="Poster">
                                {isEditable &&
                                    <FileInput handleUpload={uploadPoster}>
                                        <img className="upload-poster" src={changePhoto} alt="Change poster" />
                                    </FileInput>}
                                <img
                                    src={poster ? `${process.env.REACT_APP_URL}${poster}` : defaultPoster}
                                    className={isEditable ? "semi-visible" : ""}
                                    alt="Poster" />
                                <div className="actions">
                                    {isCurrentUser && <i className="fa fa-edit" onClick={editTrack} />}
                                    <i className="fa fa-play" onClick={handlePlay} />
                                    <i className="fa fa-plus" onClick={handleAdd} />
                                </div>
                            </div>
                            <div className="track-header">
                                <div className="title">
                                    <EditableText
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        isEditable={isEditable} />
                                </div>
                                <div className="author">
                                    <EditableText
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        isEditable={isEditable} />
                                </div>
                                <div className="genres">
                                    {genres &&
                                        genres.map(genre =>
                                            <Genre
                                                genre={genre}
                                                isEditable={isEditable}
                                                handleRemove={handleRemoveGenre}
                                                key={genre.id} />)}
                                    {isEditable && <AddGenre handleCreate={handleCreateGenre} />}
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
                                    areaStyle={{ padding: "10px", minHeight: "250px" }} />
                            </div>
                        </div>
                        <div className="controls">
                            {isEditable && <Button onClick={saveChanges}>Save</Button>}
                            {isEditable && <Button onClick={() => setIsEditable(false)}>Cancel</Button>}
                        </div>
                    </>)
                }
            </div>
            <Dialog
                open={isAddPlaylistClicked}
                title="Select playlist"
                handleClose={handleAddPlaylistClose}>
                <Playlists
                    trackToAdd={{ id }}
                    onAddMessage={onAddMessage}
                    style={{ maxHeight: "250px", margin: 0, minWidth: "200px" }} />
            </Dialog>
        </ContentWrapper>
    )
};

export default Track;
