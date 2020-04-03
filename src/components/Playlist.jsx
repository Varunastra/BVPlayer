import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setPlaylist, setIsOpen } from "../actions/playlists";

export function Playlist({ id, name }) {
    const playing = useSelector(state => state.playlists.current);
    const isPlaying = playing.id === id;

    const dispatch = useDispatch();

    const onPlaylistClicked = () => {
        dispatch(setPlaylist({ id, name }));
        dispatch(setIsOpen());
    };

    return (
        <div className="playlist" onClick={onPlaylistClicked}>
            <img className="playlist-folder" src={process.env.PUBLIC_URL + "./playlist.svg"} />
            <div className="container">
                <strong>{name}</strong>
            </div>
        </div>
    )
}
