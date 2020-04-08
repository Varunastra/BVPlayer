import React from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./actions/user";
import { SignUp } from "./pages/SignUp";

export function Routes() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch();

    if (isAuthenticated) {
        dispatch(fetchUser());
    }

    return <Router>
        <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />
            {isAuthenticated
                ? <Route path="/" component={Home} />
                : <Redirect to="/login" />}
        </Switch>
    </Router>
}