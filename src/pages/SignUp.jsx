import React, { useState, useEffect } from "react";
import { ContentWrapper } from "./ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/user";
import { withRouter } from "react-router-dom";
import TextField from "../components/UI/TextField/TextField";
import Button from "../components/UI/Button/Button";

function SignUpWithRouter({ history }) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser({ login, password }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            history.replace("/");
        }
    }, [isAuthenticated, history]);

    return (
        <>
            <ContentWrapper>
                <form className="sign-in" onSubmit={handleRegister}>
                    <h3>Sign up</h3>
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
                    <Button type="submit">Register</Button>
                </form>
            </ContentWrapper>
        </>
    );
}

export const SignUp = withRouter(SignUpWithRouter);