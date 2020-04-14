import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPlaylists } from '../../actions/playlists';
import { useKeyPress } from '../../hooks/useKeyPress';
import { updatePlaylist } from '../../api/playlist';
import EditableText from '../UI/EditableText/EditableText';

function PlaylistEdit({ playlist, isEditable, setIsEditable }) {
    const [name, setName] = useState(playlist.name);
    const dispatch = useDispatch();
    const isEnterPressed = useKeyPress("Enter");

    useEffect(() => {
        const handlePlaylistUpdate = async () => {
            await updatePlaylist({ ...playlist, name: name });
            dispatch(fetchPlaylists("me"));
        };
        if (isEnterPressed) {
            handlePlaylistUpdate();
        }
    }, [isEnterPressed, dispatch, name, playlist]);

    return (
        <EditableText 
            value={name}
            onChange={e => setName(e.target.value)}
            isEditable={isEditable} 
            setIsEditable={setIsEditable}
        />
    )
};

export default PlaylistEdit;
