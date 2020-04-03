import { settings } from "./settings";
import { status } from "./status";
import { combineReducers } from "redux";
import { playlist } from "./playlist";
import { playlists } from "./playlists";

export const reducer = combineReducers({ settings, status, playlist, playlists });