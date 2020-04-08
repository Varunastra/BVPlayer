import React, { useState, useEffect } from "react";
import { ContentWrapper } from "./ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { auhtorizeUser } from "../actions/user";
import { withRouter, Link } from "react-router-dom";
import TextField from "../components/UI/TextField/TextField";
import Button from "../components/UI/Button/Button";

function SignInWithRouter({ history }) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(auhtorizeUser(login, password));
    };

    useEffect(() => {
        if (isAuthenticated) {
            history.replace("/");
        }
    }, [isAuthenticated, history]);

    return (
        <>
            <ContentWrapper>
                <form className="sign-in" onSubmit={handleLogin}>
                    <h3>Sign in</h3>
                    <TextField
                        value={login}
                        type="text"
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Enter login"
                    />
                    <TextField
                        value={password}
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Login</Button>
                    <div>First time?, <Link to="/register">register</Link> first</div>
                </form>
            </ContentWrapper>
        </>
    );
}

export const SignIn = withRouter(SignInWithRouter);
