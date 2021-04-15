import React, { useEffect } from "react";
import { Tracks } from "../components/Tracks/Tracks";
import { Playlists } from "../components/Playlists/Playlists";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../actions/playlists";
import PlayerContainer from "../components/Player/PlayerContainer";

export function Home() {
  const playlistsOpen = useSelector((state) => state.playlists.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylists("me"));
  }, [dispatch]);

  return (
    <>
      <PlayerContainer />
      {playlistsOpen ? <Tracks /> : <Playlists />}
    </>
  );
}

export default Home;
