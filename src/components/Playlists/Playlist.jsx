import React from "react";
import { useDispatch } from "react-redux";
import { setPlaylist, setIsOpen, fetchPlaylists } from "../../actions/playlists";
import playlistLogo from "../../images/playlist.svg";
import { deletePlaylist, addTrack } from "../../api/playlist";

export function Playlist({ playlist, trackToAdd, handleAddSuccess, handleAddError }) {
    const { name, id } = playlist;

    const dispatch = useDispatch();

    const onPlaylistClicked = async () => {
        if (trackToAdd) {
            try {
                const { message } = await addTrack({ trackId: trackToAdd.id, playlistId: id });
                handleAddSuccess(message);
            }
            catch(e) {
                handleAddError(e.message);
            }
        }
        else {
            dispatch(setPlaylist(playlist));
            dispatch(setIsOpen());
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        await deletePlaylist(id);
        dispatch(fetchPlaylists("me"));
    };

    return (
        <div className="playlist" onClick={onPlaylistClicked}>
            <img
                className="playlist-folder"
                src={playlistLogo}
                alt="Playlist"
            />
            <div className="container">
                {name}
            </div>
            <div className="playlist-controls">
                {!trackToAdd && <i className="fas fa-trash" onClick={handleDelete}></i>}
            </div>
        </div>
    );
}
