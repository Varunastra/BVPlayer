const checkAuth = () => !!localStorage.token;

const initialState = {
    isAuthenticated: checkAuth(),
    isLoading: false,
    profile: null,
    isRegisterComplete: false
};

export function user(state = initialState, action) {
    switch (action.type) {
        case "FETCH_USER_SUCCESS":
            return { ...state, profile: action.payload };
        case "FETCH_USER_ERROR":
            return { ...state, error: action.payload };
        case "USER_LOGIN_SUCCESS": 
            return { ...state, isAuthenticated: true };
        case "USER_LOGIN_FAIL":
            return { ...state, isAuthenticated: false };
        case "USER_REGISTER_SUCCESS": 
            return { ...state, isRegisterComplete: true };
        case "USER_REGISTER_ERROR": 
            return { ...state, isRegisterComplete: false, error: action.payload };
        default:
            return { ...state };
    }
}