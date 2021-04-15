const checkAuth = () => !!localStorage.token;

const initialState = {
  isAuthenticated: checkAuth(),
  isLoading: false,
  profile: null,
};

export function user(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return { ...state, profile: action.payload };
    case "FETCH_USER_ERROR":
      return { ...state, error: action.payload };
    case "USER_LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, error: null };
    case "USER_LOGIN_FAIL":
      return { ...state, isAuthenticated: false, error: action.payload };
    case "USER_REGISTER_SUCCESS":
      return { ...state, error: null, isAuthenticated: true };
    case "USER_REGISTER_ERROR":
      return { ...state, error: action.payload };
    case "USER_LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false };
    default:
      return { ...state };
  }
}
