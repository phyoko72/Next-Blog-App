import {getServerSession} from "next-auth"
import Image from "next/image"
import {options} from "../api/auth/[...nextauth]/options"
import prisma from "@/lib/connect-db"
import PostSummary from "@/components/PostSummary"

async function getAuthorPosts(userId: string) {
    try {
        const posts = await prisma.post.findMany({
            where: {userId},
            include: {user: {select: {name: true, image: true}}},
            orderBy: {createdAt: "desc"},
        })
        return posts
    } catch (err) {
        return undefined
    }
}

export default async function Profile() {
    const session = await getServerSession(options)
    if (!session) return <h1 className="title">No User</h1>
    const posts = await getAuthorPosts(session.user.id)

    if (!posts) return
    return (
        <>
            <div className=" flex flex-col gap-y-3">
                <h1 className=" title">
                    {" "}
                    {session.user.name?.split(" ")[0]}&#39;s Profile
                </h1>
                {session.user?.image && (
                    <Image
                        src={session.user?.image}
                        alt={session.user.name || "profile"}
                        width={100}
                        height={100}
                        className=" rounded-full"
                    />
                )}
                <ul>
                    {session.user && (
                        <>
                            <li>Name&#58; {session.user.name}</li>
                            <li>Email&#58; {session.user.email}</li>
                        </>
                    )}
                </ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostSummary post={post} key={post.id} />
                    ))
                ) : (
                    <h1 className="title">You haven&#39;t written any post.</h1>
                )}
            </div>
        </>
    )
}
