import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "./actions/user";
import MiddleWares from "./MiddleWares";
import ContentWrapper from "./components/containers/ContentWrapper";
import Home from "./pages/Home";
import { fetchPlaylist } from "./actions/playlist";

const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Track = React.lazy(() => import("./pages/Track"));
const Playlist = React.lazy(() => import("./pages/Playlist"));

export function Routes() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      const playlistId = localStorage.getItem('playlistId');
      dispatch(fetchUser());
      if (playlistId) {
        dispatch(fetchPlaylist(playlistId));
      }
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(logoutUser());
    }
  }, [error, dispatch]);

  return (
    <>
      <React.Suspense fallback={null}>
        <Router>
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route>
              <ContentWrapper>
                <Switch>
                  {isAuthenticated ? (
                    <Route exact path="/" component={Home} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                  <Route path="/tracks/:id" component={Track} />
                  <Route path="/playlists/:id" component={Playlist} />
                  <Route path="/404" component={NotFound} />
                </Switch>
              </ContentWrapper>
            </Route>
            <Redirect to="/404" />
          </Switch>
        </Router>
      </React.Suspense>
      <MiddleWares />
    </>
  );
}
