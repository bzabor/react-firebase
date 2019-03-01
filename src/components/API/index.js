import axios from "axios";

const API = (idToken = null) => {
    const defaultOptions = {
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: idToken ? idToken : '',
        },
    };

    return {
        get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
        delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
    };
};

export default API;
