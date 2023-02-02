<script>
    import {
        Adornment,
        Button,
        CircleSpinner as Spinner,
        Icon,
        Paper,
        Screen,
        TitleBar,
    } from "svelte-doric"
    import { Dialog } from "svelte-doric/dialog"
    import { Grid } from "svelte-doric/layout"

    import { createEventDispatcher } from "svelte"

    import Uploader from "./uploader.svelte"

    import { imageList } from "@/state"

    export let stackNum

    const dispatch = createEventDispatcher()

    const close = () => dispatch("select", null)

    let dialog = null
    const select = (image) =>
        () => dispatch("select", image.url)

    let upload = false
    const opn = () => upload = true
    const cls = (evt) => {
        upload = false
        if (evt.detail === false) {
            return
        }

        imageList.refresh()
    }
</script>

<style>
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>

<Screen {stackNum} width="min(1024px, 100%)" let:stackNum stack={upload}>
    <Paper card>
        <TitleBar slot="title">
            Select Image

            <Adornment slot="menu">
                <Button variant="flat" compact on:tap={opn} color="secondary">
                    <Icon name="add" />
                </Button>
            </Adornment>

            <Adornment slot="action">
                <Button variant="flat" compact on:tap={close} color="danger">
                    <Icon name="close" />
                </Button>
            </Adornment>
        </TitleBar>

        <Grid
        scrollable
        cols="repeat(auto-fill, minmax(240px, 1fr))"
        autoRow="180px">
            {#await $imageList}
                <Spinner size={100} />
            {:then images}
                {#each images as image}
                    <Button on:tap={select(image)} compact variant="outline">
                        <img
                        src="https://images.axel669.net/{image.url}"
                        alt=""
                        />
                    </Button>
                {:else}
                    No Images
                {/each}
            {/await}
        </Grid>
    </Paper>

    <Uploader on:upload={cls} {stackNum} slot="stack" />
</Screen>

<!-- <Dialog component={Selector} bind:this={dialog} />
<Button on:tap={select} {...$$props}>
    <slot />
</Button> -->
