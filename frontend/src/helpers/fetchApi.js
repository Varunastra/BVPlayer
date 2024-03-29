import store from "../store";

export const fetchApi = async (url, options) => {
  const token = localStorage.token;

  let defaultOptions = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (options) {
    defaultOptions = {
      ...defaultOptions,
      ...options,
    };
  }

  if (token) {
    defaultOptions.headers["Authorization"] = "Bearer " + token;
  }

  const response = await fetch(
    `${process.env.REACT_APP_URL}/api/${url}`,
    defaultOptions
  );
  const data = await response.json();

  if (response.status === 200) {
    return data;
  } else {
    if (response.status === 401) {
      store.dispatch({ type: "USER_LOGOUT" });
    }
    throw new Error(data.error);
  }
};
