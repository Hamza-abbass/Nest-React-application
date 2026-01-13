import Cookies from "js-cookie"
const apiFetch = async (url, { method = 'GET', body = null, headers = {}, queryParams = {} } = {}) => {
    const token = Cookies.get('token');
    const Finalheaders = {
        'Content-Type': 'application/json',
        ...(headers || {})
    }
    if (token) {
        Finalheaders.Authorization = `Bearer ${token}`
    }
    const fullUrl =
        Object.keys(queryParams).length > 0
            ? `${url}?${new URLSearchParams(queryParams).toString()}`
            : url;
    const options = {
        method,
        headers: Finalheaders,
        ...((method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') && body
            ? { body: JSON.stringify(body) }
            : {})
    }
    const response = await fetch(fullUrl, options);
    return response;

}
export default apiFetch;










// const token = Cookies.get('token');
//  const headers = {
//     'Content-Type': 'application/json',
//     ...(options.headers || {}),
// };
// if (token) {
//     headers.Authorization = `Bearer ${token}`;
// }

// const response = await fetch(url, {
//     ...options,
//     headers,
// });
// return response









