import { obtainToken } from "../api/auth";
import { getUserProfile, addUser } from "../api/user";

export const auhtorizeUser = (login, password) => async (dispatch) => {
  try {
    const { token } = await obtainToken(login, password);
    localStorage.setItem("token", token);
    dispatch({ type: "USER_LOGIN_SUCCESS" });
  } catch (e) {
    console.log(e);
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: "Wrong username or password",
    });
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    const profile = await getUserProfile("me");
    dispatch({ type: "FETCH_USER_SUCCESS", payload: profile });
  } catch (e) {
    dispatch({ type: "FETCH_USER_ERROR", error: e.message });
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    const { token } = await addUser(user);
    localStorage.setItem("token", token);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (e) {
    dispatch({ type: "USER_REGISTER_ERROR", payload: "User already exists" });
  }
};

export const logoutUser = () => ({ type: "USER_LOGOUT" });
