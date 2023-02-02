<script context="module">
    import {writable} from "svelte/store"

    import {
        Button,
        HexagonSpinner as Spinner,
        Icon,
    } from "svelte-doric"

    import { Err } from "@/comm/safe"

    const login = async (api) => {
        const url = new URL(document.location.href.toString().replace("#", "?"))

        if (url.searchParams.has("access_token") === false) {
            return
        }

        const idToken = url.searchParams.get("id_token")
        const accessToken = url.searchParams.get("access_token")

        history.replaceState(null, document.title, location.origin)

        await api.login(accessToken)
    }

    export const user = writable(null)

    const initUser = async (api, twitch) => {
        await login(api)

        const userInfo = await api.currentUser()
        if (Err(userInfo)) {
            user.set(false)
            return
        }

        twitch.init(userInfo)
        const twitchUserInfo = await twitch.userInfo()
        if (Err(twitchUserInfo)) {
            user.set(false)
            return
        }

        userInfo.profileImage = twitchUserInfo.profile_image_url
        user.set(userInfo)
    }
</script>

<script>
    export let api
    export let twitch
    export let clientID
    export let scopes

    initUser(api, twitch)

    let form = null
    const login = () => form.submit()
</script>

<style>
    load-area {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
    }

    form {
        --button-primary: #9146FF;
        --button-primary-text: var(--text-normal);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

{#if $user === null}
    <load-area>
        <Spinner size={120} />
    </load-area>
{:else if $user === false}
    <form action="https://id.twitch.tv/oauth2/authorize" bind:this={form}>
        <input type="hidden" name="client_id" value={clientID} />
        <input type="hidden" name="redirect_uri" value={location.origin} />
        <input type="hidden" name="response_type" value="token" />
        <input type="hidden" name="scope" value={scopes.join(" ")} />
        <Button on:tap={login} variant="fill" color="primary" round="40px">
            <Icon name="twitch:brands" />
            Login with Twitch
        </Button>
    </form>
{:else}
    <slot />
{/if}
