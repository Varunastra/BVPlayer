import React, { useEffect } from "react";
import { Tracks } from "../components/Tracks/Tracks";
import { Player } from "../components/Player/Player";
import { ContentWrapper } from "./ContentWrapper";
import { Playlists } from "../components/Playlists/Playlists";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../actions/playlists";

export function Home() {
    const playlistsOpen = useSelector((state) => state.playlists.isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlaylists("me"));
    }, [dispatch]);

    return (
        <ContentWrapper>
            <main className="content">
                <Player />
                {playlistsOpen ? <Tracks /> : <Playlists />}
            </main>
        </ContentWrapper>
    );
}
