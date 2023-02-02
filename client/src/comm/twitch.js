import { Err } from "@/comm/safe"
import http from "@/comm/http"

let clientID = null
let token = null
let userID = null

const apiURL = "https://api.twitch.tv/helix"
const get = async (path, params) => {
    const queryString = new URLSearchParams(params).toString()
    const url = `${apiURL}${path}?${queryString}`

    const response = await fetch(
        url,
        {
            headers: {
                "Client-ID": clientID,
                "Authorization": `Bearer ${token}`
            }
        }
    )
    const data = await response.json()

    if (response.ok === false) {
        const error = new Error(response.statusText)
        error.detail = data
        return error
    }

    return data
}
const get2 = (url, options) =>
    http.get(
        `${apiURL}${url}`,
        {
            ...options,
            headers: {
                "Client-ID": clientID,
                "Authorization": `Bearer ${token}`
            }
        }
    )
const post = (url, data, options) =>
    http.postJSON(
        `${apiURL}${url}`,
        data,
        {
            ...options,
            headers: {
                "Client-ID": clientID,
                "Authorization": `Bearer ${token}`
            }
        }
    )

export default {
    init: (user) => {
        clientID = user.clientID
        token = user.token
        userID = user.userID
    },
    channelInfo: async (userID) => {
        const channel = await get(
            "/channels",
            { broadcaster_id: userID }
        )
        if (Err(channel)) {
            return channel
        }
        return channel.data[0]
    },
    userInfo: async () => {
        const user = await get(
            "/users",
            { id: userID }
        )
        if (Err(user)) {
            return user
        }
        return user.data[0]
    },
    rewards: async (userID) => {
        const channel = await get(
            "/channel_points/custom_rewards",
            { broadcaster_id: userID }
        )
        if (Err(channel)) {
            return channel
        }
        return channel.data
    },
    subList: async (userID) => {
        const subs = await get(
            "/subscriptions",
            { broadcaster_id: userID }
        )
        if (Err(subs)) {
            return subs
        }
        return subs
    },
    poll: async(pollID) => {
        const poll = await get2(
            "/polls",
            {
                params: {
                    broadcaster_id: userID,
                    id: pollID,
                },
            }
        )
        if (Err(poll)) {
            return poll
        }
        return poll.data[0]
    },
    createPoll: async (info) => {
        const poll = await post(
            "/polls",
            {
                ...info,
                broadcaster_id: userID
            }
        )
        if (Err(poll)) {
            return poll
        }
        return poll.data[0]
    },
}
