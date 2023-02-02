import hydra from "/opt/hydra/index.mjs"
import engine from "axel-query/esm.mjs"

import { S3 } from "@aws-sdk/client-s3"

const service = await engine("routes", true)
const s3 = new S3({ region: "us-west-1" })

// const ok = (data, headers = {}) => {
//     return {
//         statusCode: 200,
//         headers: {
//             "Content-Type": "application/json",
//             ...headers,
//         },
//         body: JSON.stringify(data)
//     }
// }

export async function handler(event) {
    const user = hydra(event)

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            await service.execute(
                JSON.parse(event.body),
                { user, s3 }
            )
        )
    }
}
