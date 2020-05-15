const getHeaders = () => {
    const token = localStorage.getItem('token');
    let headers = {};
    if (token) {
        headers.Authorization = `JWT ${token}`;
    }
    return headers
};

export default getHeaders;