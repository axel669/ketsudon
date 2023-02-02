import { writable } from "svelte/store"
import sort from "@axel669/array-sort"

import api from "@/comm/api"

const imageListSource = writable(
    new Promise(() => {})
)
const imageList = {
    subscribe: imageListSource.subscribe,
    refresh: () => {
        // imageListSource.set(null)
        imageListSource.set(
            api.main({ "images:images": {} })
                .then(
                    res => res.images.sort(
                        sort.map(
                            img => img.created,
                            sort.reverse(sort.number)
                        )
                    )
                )
        )
    }
}

export {
    imageList,
}
