import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPlaylists } from "../actions/playlists";
import PlayerContainer from "../components/Player/PlayerContainer";
import { useTitle } from "../hooks/useTitle";

export function Home() {
  const dispatch = useDispatch();
  useTitle("Home");

  useEffect(() => {
    dispatch(fetchPlaylists("me"));
  }, [dispatch]);

  return (
    <>
      <PlayerContainer />
    </>
  );
}

export default Home;
