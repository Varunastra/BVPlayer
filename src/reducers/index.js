import { settings } from "./settings";
import { status } from "./status";
import { combineReducers } from "redux";

export const reducer = combineReducers({ settings, status });