import PostDetails from "@/components/PostDetails"
import Warning from "@/components/Warning"
import prisma from "@/lib/connect-db"
import {notFound} from "next/navigation"

async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: {id},
        include: {user: {select: {name: true, image: true}}},
    })
}

export default async function Post({
    params: {postId},
}: {
    params: {postId: string}
}) {
    const post = await getPost(postId)
    if (!post) notFound()
    return (
        <>
            <PostDetails post={post} />
            <Warning addPost={false} />
        </>
    )
}
