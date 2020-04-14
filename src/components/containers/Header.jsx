import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/logo.svg";
import Searchbar from "../Searchbar/Searchbar";
import { logoutUser } from "../../actions/user";
import { useHistory } from "react-router-dom";

function Header() {
    const user = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const history = useHistory();

    const toggleMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    }

    const handleHomeClick = () => {
        history.push("/");
    };

    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch(logoutUser());
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
            <Searchbar />
            <div className="user" onClick={toggleMenu}>
                <span>{user && user.login}</span>
                <i className="fa fa-user fa-lg" />
                {isUserMenuOpen &&
                    <ul className="user-menu">
                        <li className="logout" onClick={handleLogout}>Logout</li>
                    </ul> 
                }
            </div>
        </header>
    );
}

export default Header;
