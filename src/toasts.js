import store from "./store";
import { addToast } from "./actions/status";

export const makeToast = async ({ message, type = "success", undoAction }) => {  
   store.dispatch(addToast({ message, type, undoAction }));
};