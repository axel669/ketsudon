<script>
    export let node

    $: x = node.pos[0]
    $: y = node.pos[1]
</script>

<style>
    g {
        --grid-size: 8px;
        transform: translate(
            calc(
                var(--grid-size) * var(--y)
            ),
            calc(
                var(--grid-size) * var(--x)
            )
        );
    }

    rect {
        stroke: var(--text-normal);
    }
</style>

<g style="--x: {x}; --y: {y};">
    <rect width={120} height={80} rx={4} />
    <text>
        ID: {node.id}
    </text>
</g>
