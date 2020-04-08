export const fetchApi = async (url, options) => {
    const token = localStorage.token;

    let defaultOptions = {
        headers: {
            "Content-type": "application/json",
        }
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
    
    const response = await fetch(`${process.env.REACT_APP_URL}/api/${url}`, defaultOptions);

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
    else {
        if (response.status === 401) {
            localStorage.removeItem("token");
        }
        throw new Error(response.statusText);
    }
}