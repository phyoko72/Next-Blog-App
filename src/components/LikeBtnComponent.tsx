import prisma from "@/lib/connect-db"
import LikeBtn from "./LikeBtn"
import {unstable_cache} from "next/cache"

const getLikes = unstable_cache(
    async (postId: string) => {
        return await prisma.like.findMany({
            where: {postId},
            include: {user: {select: {name: true, image: true}}},
        })
    },
    ["likes"],
    {tags: ["likes"]}
)

export default async function LikeBtnComponent({postId}: {postId: string}) {
    const likes = await getLikes(postId)
    return (
        <>
            <LikeBtn likes={likes} postId={postId} />
        </>
    )
}
