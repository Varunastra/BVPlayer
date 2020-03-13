import React from "react";
import { Header } from "../components/Header";

export function ContentWrapper(props) {
    return (
        <>
            <Header />
            <main className="content">{props.children}</main>
        </>
    );
}
