<script>
    import {
        Button,
    } from "svelte-doric"

    import StoryNode from "./story-editor/story-node.svelte"

    const nodes = {
        1: {
            id: 1,
            options: [2, 3],
            pos: [0, 0],
        },
        2: {
            id: 2,
            options: [4],
            pos: [5, 0],
        },
        3: {
            id: 3,
            options: [2],
            pos: [0, 5],
        },
        4: {
            id: 4,
            options: [],
            pos: [5, 5],
        },
    }

    $: nodeList = Object.values(nodes)
    $: edges =
        nodeList
        .map(
            node => node.options.map(
                opt => [node.id, opt]
            )
        )
        .flat()

    $: console.log(nodeList)
    $: console.log(edges)

    // $: root = nodes[node.rootID]
</script>

<style>
    svg {
        width: 100%;
        height: 100%;
    }
</style>

<!-- <Button on:tap={create}>
    New Node
</Button> -->

<svg>
    {#each nodeList as node (node.id)}
        <StoryNode {node} />
    {/each}
</svg>
