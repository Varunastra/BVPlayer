import React from "react";
import defaultPoster from "../../images/poster.svg";
import { useHistory } from "react-router-dom";

function SearchItem({ title, artist, poster, id }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tracks/${id}`);
  };

  return (
    <div className="search-item" onClick={handleClick}>
      <img
        src={poster ? `${process.env.REACT_APP_URL}${poster}` : defaultPoster}
        alt="poster"
      />
      <div className="track-info">
        <div className="title">{title}</div>
        <div className="author">{artist}</div>
      </div>
    </div>
  );
}

export default SearchItem;
