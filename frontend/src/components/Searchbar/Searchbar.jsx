import React, { useState, useEffect } from "react";
import { searchTrack } from "../../api/playlist";
import SearchItem from "./SearchItem";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

function Searchbar({ isMenuOpen, setIsMenuOpen }) {
  const [tracks, setTracks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const clearSearch = () => {
    setSearchText("");
  };

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce(() => {
      searchTrack({ searchText }).then((tracks) => setTracks(tracks));
    }, 350),
    [searchText]
  );

  const popupMenu = () => {
    if (searchText.length) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const performSearch = (e) => {
    setSearchText(e.target.value);
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    if (searchText.length) {
      debouncedSearch();
    } else {
      setTracks([]);
      setIsMenuOpen(false);
    }
  }, [searchText, setIsMenuOpen, debouncedSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="bar"
        value={searchText}
        onChange={performSearch}
        placeholder="Enter performers name or title"
      />
      {!searchText.length ? <SearchOutlined onClick={popupMenu} />
        : <CloseOutlined onClick={clearSearch} />}
      {isMenuOpen && (
        <div className="search-menu">
          {tracks.map((track) => (
            <SearchItem {...track} key={track.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
