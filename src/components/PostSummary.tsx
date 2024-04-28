import Image from "next/image"
import Link from "next/link"

export default async function PostSummary({post}: {post: PostType}) {
    const getDate = (date: Date) => new Date(date).toLocaleDateString()
    return (
        <Link href={`/posts/${post?.id!}`}>
            <div className=" bg-post flex flex-col gap-y-4 rounded-md p-1 md:p-3 my-4">
                <div className=" flex justify-between items-center gap-y-2">
                    <div className=" flex justify-between items-center gap-2">
                        <Image
                            src={post?.user.image!}
                            alt={post?.user.name!}
                            width={25}
                            height={25}
                            className=" rounded-full"
                        />
                        <div className=" flex flex-col">
                            <span className=" text-sm font-bold">
                                {post?.user.name}
                            </span>
                            <span className=" text-sm">
                                {getDate(post?.createdAt!)}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className=" text-2xl font-bold mb-2">{post?.title}</h1>
                    <p className=" md:text-lg">
                        {post.content.length > 150
                            ? post.content.substring(0, 150) + " ..."
                            : post.content}
                    </p>
                </div>
            </div>
        </Link>
    )
}
