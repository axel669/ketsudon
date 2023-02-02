<script context="module">
    const readFile = (file) => new Promise(
        resolve => {
            const reader = new FileReader()

            reader.addEventListener(
                "load",
                () => resolve(reader.result)
            )
            reader.readAsDataURL(file)
        }
    )
</script>

<script>
    import { createEventDispatcher } from "svelte"

    import {
        Adornment,
        Button,
        Footer,
        Icon,
        Paper,
        Screen,
        TitleBar,
    } from "svelte-doric"
    import { Dialog } from "svelte-doric/dialog"
    import { Grid } from "svelte-doric/layout"

    import { v4 as uuid } from "uuid"

    export let stackNum

    const dispatch = createEventDispatcher()
    const close = () => dispatch("upload", false)

    let previewFile = null
    let previewURL = null
    const format = (evt) => {
        evt.dataTransfer.dropEffect = "move"
    }
    const preview = async (evt) => {
        const file = evt.dataTransfer.files[0]

        if (file === undefined) {
            return
        }

        updatePreview(file)
    }
    const upload = async () => {
        const [ext] = previewFile.name.split(".").slice(-1)
        const name = `${uuid()}.${ext}`

        const res = await fetch(
            `https://api.axel669.net/ketsudon/upload/${name}`,
            {
                method: "PUT",
                credentials: "include",
                body: previewFile,
            }
        )

        updatePreview(null)
        dispatch("upload", true)
    }

    const updatePreview = async (file) => {
        previewFile = file

        if (file === null) {
            previewURL = null
            return
        }

        previewURL = await readFile(file)
    }

    $: previewCSS = (previewURL === null) ? "" : `url(${previewURL})`
</script>

<style>
    div {
        background-color: teal;
        background-image: var(--url);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    }
</style>

<Screen {stackNum} width="min(960px, 100%)">
    <Paper card>
        <TitleBar slot="title">
            Upload Image

            <Adornment slot="action">
                <Button on:tap={close} color="danger" flat>
                    <Icon name="close" />
                </Button>
            </Adornment>
        </TitleBar>

        <Grid cols="1fr" rows="1fr">
            <div
            on:dragover|preventDefault={format}
            on:drop|preventDefault={preview}
            style="--url: {previewCSS}"
            >
                Drop or Select Files
            </div>
        </Grid>

        <Footer slot="action">
            <Button on:tap={upload}
            disabled={previewURL === null}
            variant="fill"
            color="secondary">
                Upload Image
            </Button>
        </Footer>
    </Paper>
</Screen>
