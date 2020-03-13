import React from "react";

export function Header() {
    return (
        <header>
            <div className="logo">
                <img
                    className="logo-image"
                    src={process.env.PUBLIC_URL + "/logo.svg"}
                    alt="logo"
                />
                <h3>BVPlayer</h3>
            </div>
            <i className="fa fa-user fa-lg" />
        </header>
    );
}
