import React, { useState, useEffect } from 'react';
import "./Searchbar.scss";
import { searchTrack } from '../../api/playlist';
import SearchItem from './SearchItem';

function Searchbar() {
    const [tracks, setTracks] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const clearSearch = () => {
        setSearchText("");
    };

    const popupMenu = () => {
        if (searchText.length) {
            setIsMenuOpen(!isMenuOpen);
        }
    }

    const performSearch = async (e) => {
        setSearchText(e.target.value);
        if (!isMenuOpen) {
            setIsMenuOpen(true);
        }
    };

    useEffect(() => {
        if (searchText.length) {
            searchTrack({ searchText }).then(tracks => setTracks(tracks));
        }
        else {
            setTracks([]);
            setIsMenuOpen(false);
        }
    }, [searchText]);

    return (
        <div className="search-bar">
            <input type="text" className="bar" value={searchText} onChange={performSearch} placeholder="Enter performers name or title" />
            <li className="fa fa-search" onClick={popupMenu} />
            {isMenuOpen && <i className="fa fa-times" onClick={clearSearch} />}
            {isMenuOpen &&
            <div className="search-menu">
                {tracks.map((track) => <SearchItem {...track} key={track.id} />)}
            </div> }
        </div>
    )
};

export default Searchbar;
