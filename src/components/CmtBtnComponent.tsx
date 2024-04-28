import prisma from "@/lib/connect-db"
import {unstable_cache} from "next/cache"
import CmtBtn from "./CmtBtn"

const getComments = unstable_cache(
    async (postId: string) => {
        return await prisma.comment.findMany({
            where: {postId},
            include: {user: {select: {name: true, image: true}}},
            orderBy: {createdAt: "desc"},
        })
    },
    ["cmts"],
    {tags: ["cmts"]}
)

export default async function CmtBtnComponent({postId}: {postId: string}) {
    const comments = await getComments(postId)

    return (
        <>
            <CmtBtn comments={comments} postId={postId} />
        </>
    )
}
