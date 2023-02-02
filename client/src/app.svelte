<script>
    import {
        AppStyle,
        Baseline as baseline,

        Button,
    } from "svelte-doric"
    import { TronTheme as theme } from "svelte-doric/theme"

    import { v4 as uuid } from "uuid"

    import api from "@/comm/api"
    import twitch from "@/comm/twitch"

    import Login from "./login.svelte"
    import Dashboard from "./dashboard.svelte"

    const clientID = "qumy5rd6hzxzkrzht6bkkxad5f9bnl"
    const scopes = [
        "openid",
        "channel:manage:polls",
        "user:read:email",
    ]

    window.get = async (url) => {
        const response = await fetch(url, { credentials: "include" })
        return await response.json()
    }

    const decisions = [
        () => console.log("Fibonacci"),
        () => console.log("Lucas"),
    ]
    const test = async () => {
        const poll = await twitch.createPoll({
            title: "Best Sequence",
            choices: [
                { title: "Fibonacci (wrong)" },
                { title: "Lucas" },
            ],
            duration: 15
        })
        setTimeout(
            async () => {
                const result = await twitch.poll(poll.id)
                const winner = result.choices.reduce(
                    ([winner, votes], item, index) => {
                        if (item.votes > votes) {
                            return [index, item.votes]
                        }
                        return [winner, votes]
                    },
                    [-1, 0]
                )
                console.log(winner)
                decisions[winner[0]]()
            },
            16000
        )
    }
</script>

<AppStyle {baseline} {theme} />

<Login {api} {twitch} {clientID} {scopes}>
    <Dashboard />
</Login>
