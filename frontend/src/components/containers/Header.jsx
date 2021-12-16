import React from "react";
import UserMenu from "./UserMenu";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/");
  };

  return (
    <header>
      <div className="logo" onClick={handleHomeClick}>
        <img className="logo-image" src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo" />
        <h3>BVPlayer</h3>
      </div>
      <UserMenu />
    </header>
  );
}

export default Header;
