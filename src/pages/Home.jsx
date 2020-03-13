import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Tracks } from "../components/Tracks";
import { reducer } from "../reducers/index";
import { Player } from "../components/Player/Player";
import { ContentWrapper } from "./ContentWrapper";

const store = createStore(
    reducer,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export function Home() {
    const 

    return (
        <ContentWrapper>
            <Provider store={store}>
                <main className="content">
                    <Player />
                    <Tracks />
                </main>
            </Provider>
        </ContentWrapper>
    );
}
