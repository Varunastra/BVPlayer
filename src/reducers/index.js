import { status } from "./status";
import { combineReducers } from "redux";
import { playlist } from "./playlist";
import { playlists } from "./playlists";
import { user } from "./user";

export const reducer = combineReducers({ status, playlist, playlists, user });