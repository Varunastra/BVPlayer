import React, { useState } from "react";
import { ContentWrapper } from "./ContentWrapper";

export function SignIn() {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    return (
        <>
            <ContentWrapper>
                <div className="sign-in">
                    <h3>Sign in</h3>
                    <input
                        type="text"
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
            </ContentWrapper>
        </>
    );
}
