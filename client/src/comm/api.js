import http from "./http.js"

const apiURL = "https://api.axel669.net/ketsudon"

function get(route, options) {
    return http.get(`${apiURL}${route}`, { ...options, auth: true })
}
function postJSON(route, data, options) {
    return http.postJSON(`${apiURL}${route}`, data, { ...options, auth: true })
}

async function login(key) {
    const result = await postJSON(
        "/login",
        { key }
    )

    if (result === true) {
        return
    }
    console.log("Login failed")
}

async function currentUser() {
    return await get("/user")
}

const main = async (query) => {
    const results = await postJSON("/main", query)

    return Object.fromEntries(
        Object.entries(results).map(
            ([key, result]) => {
                if (result.error !== undefined) {
                    return [
                        key,
                        new Error(result.error)
                    ]
                }
                return [key, result.value]
            }
        )
    )
}

export default {
    login,
    currentUser,
    main,
}
