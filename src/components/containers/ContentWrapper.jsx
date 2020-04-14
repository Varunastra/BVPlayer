import React from "react";
import Header from "./Header";

function ContentWrapper(props) {
    return (
        <>
            <Header />
            <main className="content">
                {props.children}
            </main>
        </>
    );
}

export default ContentWrapper;