import AddPostForm from "@/components/AddPostForm"
import {editPost} from "@/lib/actions"
import prisma from "@/lib/connect-db"
import {notFound} from "next/navigation"

async function getPostData(id: string) {
    try {
        const post = await prisma.post.findUnique({
            where: {id},
        })
        return post
    } catch (err) {
        return undefined
    }
}

export default async function EditPost({
    params: {editPostId},
}: {
    params: {editPostId: string}
}) {
    const post = await getPostData(editPostId)
    if (!post) notFound()
    const editPostAction = editPost.bind(null, post.id)
    return (
        <>
            <AddPostForm
                post={post}
                postAction={editPostAction}
                btnText="Edit"
            />
        </>
    )
}
