import { obtainToken } from "../api/auth"
import { getUserProfile, addUser } from "../api/user";

export const auhtorizeUser = (login, password) => async (dispatch) => {
    const { token, message } = await obtainToken(login, password);

    if (token) {
        localStorage.setItem("token", token);
        dispatch({ type: "USER_LOGIN_SUCCESS" });
    }
    else {
        dispatch({ type: "USER_LOGIN_FAIL", payload: message });
    }
};

export const fetchUser = () => async (dispatch) => {
    try {
        const profile = await getUserProfile("me");
        dispatch({ type: "FETCH_USER_SUCCESS", payload: profile });
    }
    catch(e) {
        dispatch({ type: "FETCH_USER_ERROR", error: e.message });
    }
};

export const registerUser = (user) => async (dispatch) => {
    try {
        await addUser(user);
        dispatch({ type: "USER_REGISTER_SUCCESS" });
    }
    catch (e) {
        dispatch({ type: "USER_REGISTER_ERROR" });
    }
};