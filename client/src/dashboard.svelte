<script>
    import {
        Avatar,
        AppBar,
        Button,
        Screen,
        Text,
    } from "svelte-doric"
    import { Flex } from "svelte-doric/layout"

    import Selector from "@/comp/selector.svelte"
    import StoryEditor from "@/comp/story-editor.svelte"

    import { user } from "@/login.svelte"

    import { imageList } from "@/state"

    let stack = false
    const imageSelect = (evt) => {
        const url = evt.detail

        stack = false
        if (url === null) {
            return
        }

        console.log(url)
    }

    imageList.refresh()
</script>

<Screen full let:stackNum {stack}>
    <AppBar slot="title">
        <Avatar image={$user.profileImage} />
        {$user.displayName} - Ketsudon
    </AppBar>

    <!-- <Flex> -->
        <StoryEditor />
        <!-- <Button variant="outline" color="secondary" on:tap={() => stack = true}>
            Select image
        </Button>
        <Text>
            {#await $imageList}
                refreshing...
            {:then images}
                Count: {images.length}
            {/await}
        </Text> -->
    <!-- </Flex> -->

    <!-- <Selector on:select={imageSelect} slot="stack" {stackNum}>
        Select Image
    </Selector> -->
</Screen>
