import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./actions/user";
import MiddleWares from "./MiddleWares";

const SignUp = React.lazy(() => import("./pages/SignUp"));
const Home = React.lazy(() => import("./pages/Home"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Track = React.lazy(() => import("./pages/Track"));

export function Routes() {
    const isAuthenticated = useSelector(
        (state) => state.user.isAuthenticated
    );
    const dispatch = useDispatch();

    if (isAuthenticated) {
        dispatch(fetchUser());
    }

    return (
        <>
            <React.Suspense fallback={<></>}>
                <Router>
                    <Switch>
                        <Route path="/login" component={SignIn} />
                        <Route path="/register" component={SignUp} />
                        {isAuthenticated ? (
                            <Route exact path="/" component={Home} />
                        ) : (
                                <Redirect to="/login" />
                            )}
                        <Route path="/tracks/:id" component={Track} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                    <MiddleWares />
                </Router>
            </React.Suspense>
        </>
    );
}
