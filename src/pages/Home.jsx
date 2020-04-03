import React from "react";
import { useSelector } from "react-redux";
import { Tracks } from "../components/Tracks";
import { Player } from "../components/Player/Player";
import { ContentWrapper } from "./ContentWrapper";
import { Playlists } from "../components/Playlists";

export function Home() {
    const isPlaylistsOpen = useSelector(state => state.playlists.isOpen);

    console.log("state change");

    return (
        <ContentWrapper>
            <main className="content">
                <Player />
            { isPlaylistsOpen ? <Tracks /> : <Playlists /> }
            </main>
        </ContentWrapper>
    );
}
