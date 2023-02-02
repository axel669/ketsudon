const get = async (url, options = {}) => {
    const {
        headers = {},
        params = {},
        auth = false,
    } = options
    const paramString = new URLSearchParams(params).toString()

    const res = await fetch(
        `${url}?${paramString}`,
        {
            headers,
            credentials: auth ? "include" : undefined,
        }
    )
    if (res.status !== 200) {
        return new Error(res.statusText)
    }
    return await res.json()
}
const post = async (url, options = {}) => {
    const {
        headers = {},
        data,
        dataType,
        method = "POST",
        params = {},
        auth = false,
    } = options

    const queryParams = new URLSearchParams(params).toString()
    const fetchOptions = {
        method,
        headers: {
            ...headers,
            "Content-Type": dataType
        },
        body: data,
        credentials: auth ? "include" : undefined,
    }
    const res = await fetch(`${url}?${queryParams}`, fetchOptions)
    if (res.status !== 200) {
        return new Error(res.statusText)
    }
    return await res.json()
}
const postJSON = async (url, data, options = {}) =>
    post(
        url,
        {
            ...options,
            data: JSON.stringify(data),
            dataType: "application/json"
        }
    )

export default {
    get,
    post,
    postJSON,
}
