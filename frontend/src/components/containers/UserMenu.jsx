import React, { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/user";
import { ModalWrapper } from "./ModalWrapper";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

function UserMenu() {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logoutUser());
  };

  useEffect(() => {
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleSearchMenu = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div className="user-desktop">
        <Searchbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="user" onClick={toggleMenu}>
          <span>{user && user.login}</span>
          <UserOutlined />
          {isUserMenuOpen && (
            <ul className="user-menu">
              <li className="logout" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="user-mobile">
        <div className="user" onClick={toggleMenu}>
          <UserOutlined />
          <span>{user && user.login}</span>
        </div>
        <MenuOutlined onClick={toggleSearchMenu} />
        {isUserMenuOpen && (
          <ul className="user-menu">
            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        )}
        {isSearchOpen && (
          <ModalWrapper onToggleModal={toggleSearchMenu}>
            <div className="search-open" onClick={(e) => e.stopPropagation()}>
              <Searchbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          </ModalWrapper>
        )}
      </div>
    </>
  );
}

export default UserMenu;
