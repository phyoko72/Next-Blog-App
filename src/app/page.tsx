import prisma from "@/lib/connect-db"
import PostSummary from "@/components/PostSummary"
import Pagination from "@/components/Pagination"
import Search from "@/components/Search"
import {unstable_cache} from "next/cache"

const getAllPosts = unstable_cache(
    async (take: number, skip: number, search: string) => {
        return await prisma.post.findMany({
            where: {title: {contains: search, mode: "insensitive"}},
            include: {user: {select: {name: true, image: true}}},
            orderBy: {createdAt: "desc"},
            take,
            skip,
        })
    },
    ["posts"],
    {tags: ["posts"]}
)

async function getPostsLength(search: string) {
    return await prisma.post.count({
        where: {title: {contains: search, mode: "insensitive"}},
    })
}

export default async function Home({
    searchParams,
}: {
    searchParams: {page: string; size: string; search: string}
}) {
    const page = Number(searchParams.page) || 1
    const size = Number(searchParams.size) || 5
    const search = searchParams.search || ""
    const skip = size * (page - 1)
    const total = await getPostsLength(search)

    const posts = await getAllPosts(size, skip, search)

    return (
        <main>
            <Search />
            {!posts || posts.length < 1 ? (
                <h1 className="title">No Post to show</h1>
            ) : (
                <>
                    <div className=" h-[700px] overflow-y-auto">
                        {posts.map((post) => (
                            <PostSummary post={post} key={post.id} />
                        ))}
                    </div>
                    <Pagination total={total} search={search} />
                </>
            )}
        </main>
    )
}
