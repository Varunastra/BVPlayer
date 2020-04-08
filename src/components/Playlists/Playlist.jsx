import React from "react";
import { useDispatch } from "react-redux";
import { setPlaylist, setIsOpen, fetchPlaylists } from "../../actions/playlists";
import playlistLogo from "../../playlist.svg";
import { deletePlaylist } from "../../api/playlist";

export function Playlist(playlist) {
    const { name, id } = playlist;

    const dispatch = useDispatch();

    const onPlaylistClicked = () => {
        dispatch(setPlaylist(playlist));
        dispatch(setIsOpen());
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        await deletePlaylist(id);
        dispatch(fetchPlaylists("me"));
    };

    const handleEdit = async (e) => {
        e.stopPropagation();
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
                <i className="fa fa-edit" onClick={handleEdit} />
                <i className="fas fa-trash" onClick={handleDelete}></i>
            </div>
        </div>
    );
}
