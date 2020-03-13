import { settings } from "./settings";
import { status } from "./status";
import { combineReducers } from "redux";
import { playlist } from "./playlist";

export const reducer = combineReducers({ settings, status, playlist });