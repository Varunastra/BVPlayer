import React from 'react';
import ContentWrapper from "../components/containers/ContentWrapper";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getTrack, updateTrack } from '../api/playlist';
import { useState } from 'react';
import defaultPoster from "../images/poster.svg";
import Genre from '../components/containers/Genre';
import { useSelector, useDispatch } from 'react-redux';
import EditableText from '../components/UI/EditableText/EditableText';
import AddGenre from '../components/AddGenre';
import Button from '../components/UI/Button/Button';
import FileInput from '../components/UI/FileInput/FileInput';
import { setTrack } from '../actions/playlist';
import { setIsPlaying } from '../actions/status';
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
        setIsEditable(false);
    };

    const uploadPoster = async (newPoster) => {
        await updateTrack({ poster: newPoster, id });
        setIsUpdating(true);
    };

    const handlePlay = () => {
        dispatch(setTrack({ title, author, genres, lyrics, poster, id, src }));
        dispatch(setIsPlaying(true));
    };

    const handleAdd = () => {
        dispatch(fetchPlaylists("me"));
        setIsAddPlaylistClicked(true);
    };

    const handleAddPlaylistClose = () => {
        setIsAddPlaylistClicked(false);
    }

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
                                        isEditable={isEditable}
                                        setIsEditable={setIsEditable} />
                                </div>
                                <div className="author">
                                    <EditableText
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        isEditable={isEditable}
                                        setIsEditable={setIsEditable} />
                                </div>
                                <div className="genres">
                                    {genres &&
                                        genres.map(genre => <Genre {...genre} key={genre.id} />)}
                                    {isEditable && <AddGenre genres={genres} trackId={id} setGenres={setGenres} />}
                                </div>
                            </div>
                        </div>
                        <div className="lyrics">
                            <h2>Lyrics</h2>
                            {!isEditable ? lyrics || "No lyrics attached"
                                : <textarea onChange={e => setLyrics(e.target.value)} value={lyrics} />}
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
                title="Select playlist to where add track" 
                handleClose={handleAddPlaylistClose}>
                <Playlists type="modal" />
            </Dialog>
        </ContentWrapper>
    )
};

export default Track;
