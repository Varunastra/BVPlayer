import React from 'react'
import { useSelector } from 'react-redux';

export function Playlist({ id, name }) {
    const playlist = useSelector(state => state.playlists.selected);
    const isPlaying = playlist.id === id;

    const { title, author, poster } = props.track;
    const dispatch = useDispatch();

    const onPlaylistClicked = () => {
        dispatch(setTrack(track));
    };

    return (
        <div className="playlist-folder" onClick={onPlaylistClicked}>
            <i class="fas fa-folder-open"></i>
            <div className="cotainer">
                <strong>name</strong>
            </div>
        </div>
    )
}
