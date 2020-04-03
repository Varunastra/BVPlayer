import React from 'react'
import { Playlist } from './Playlist'
import { useSelector } from 'react-redux'

export function Playlists() {
    const playlists = useSelector(state => state.playlists.all);

    return (
        <div className="playlists">
            {playlists.map(playlist => <Playlist key={playlist.id} {...playlist} />)}
        </div>
    )
}
