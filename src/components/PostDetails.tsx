import Image from "next/image"
import LikeBtnComponent from "./LikeBtnComponent"
import CmtBtnComponent from "./CmtBtnComponent"
import {options} from "@/app/api/auth/[...nextauth]/options"
import {getServerSession} from "next-auth"
import SettingBtn from "./SettingBtn"

export default async function PostDetails({post}: {post: PostType}) {
    const session = await getServerSession(options)
    const getDate = (date: Date) => new Date(date).toLocaleDateString()
    return (
        <div className=" bg-post flex flex-col gap-y-4 rounded-md p-1 md:p-3 h-fit">
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
                {post?.userId === session?.user.id && (
                    <SettingBtn postId={post?.id!} />
                )}
            </div>
            <div>
                <h1 className=" text-2xl font-bold mb-2">{post?.title}</h1>
                <p>{post?.content}</p>
            </div>
            <div className=" grid grid-cols-2 gap-x-2 relative">
                <LikeBtnComponent postId={post?.id!} />
                <CmtBtnComponent postId={post?.id!} />
            </div>
        </div>
    )
}
