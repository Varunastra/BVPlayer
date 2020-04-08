import React from "react";
import { useSelector } from "react-redux";
import logo from "../logo.svg";

export function Header() {
    const user = useSelector((state) => state.user.profile);

    return (
        <header>
            <div className="logo">
                <img
                    className="logo-image"
                    src={logo}
                    alt="logo"
                />
                <h3>BVPlayer</h3>
            </div>
            <div>
                <span>{user && user.login}</span>
                <i className="fa fa-user fa-lg" />
            </div>
        </header>
    );
}
