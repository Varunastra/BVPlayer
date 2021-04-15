import React from "react";
import Header from "./Header";

const ContentWrapper = React.memo(function ContentWrapper(props) {
    return (
        <>
            <Header />
            <main className="content">
                {props.children}
            </main>
        </>
    );
});

export default ContentWrapper;