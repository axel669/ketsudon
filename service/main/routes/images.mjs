export default {
    args: {},
    "value[]": {
        created: "int",
        url: "string",
    },
    func: async (_, context) => {
        const { user, s3 } = context

        const items = await s3.listObjectsV2({
            Bucket: "images.axel669.net",
            Prefix: `ketsudon/${user.userID}/`
        })

        if (items.Contents === undefined) {
            return []
        }

        return items.Contents.map(
            item => ({
                created: item.LastModified.getTime(),
                url: item.Key,
            })
        )
    }
}
