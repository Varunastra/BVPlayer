import React from "react";
import logo from "../../images/logo.svg";
import { useHistory } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

function Header() {
    const history = useHistory();

    const handleHomeClick = () => {
        history.push("/");
    };

    return (
        <header>
            <div className="logo" onClick={handleHomeClick}>
                <img
                    className="logo-image"
                    src={logo}
                    alt="logo"
                />
                <h3>BVPlayer</h3>
            </div>
            <UserMenu />
        </header>
    );
}

export default Header;
