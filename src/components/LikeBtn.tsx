"use client"

import {useSession} from "next-auth/react"
import {likePost, unLikePost} from "@/lib/actions"
import Image from "next/image"
import {useContext} from "react"
import {ToggleContext} from "@/providers/ToggleProvider"
export default function LikeBtn({
    likes,
    postId,
}: {
    likes: LikeType[]
    postId: string
}) {
    const {data: session, status} = useSession()

    const didILike = likes?.find((like) => like.userId === session?.user.id)

    const {setIsNotiShown, isLikeShown, setIsLikeShown, setIsCmtShown} =
        useContext(ToggleContext)

    const handleClick = () => {
        if (!session) return setIsNotiShown(true)

        if (didILike) {
            unLikePost(
                likes.find((like) => like.userId === session.user.id)?.id!
            )
        } else {
            likePost(postId, session?.user.id!)
        }
    }
    return (
        <div>
            <span
                className=" underline underline-offset-2 cursor-pointer"
                onClick={() => {
                    if (likes.length < 1) return
                    setIsLikeShown((prev) => !prev)
                    setIsCmtShown(false)
                }}
            >
                {likes.length} {likes.length > 1 ? "Likes" : "Like"}
            </span>
            <button onClick={handleClick} className="btn w-full">
                {status === "loading" ? "..." : didILike ? "Liked" : "Like"}
            </button>
            <div
                className={`${
                    isLikeShown ? "" : "hidden"
                } absolute top-16 w-full p-1 bg-post min-h-fit h-[100px] overflow-y-auto`}
            >
                <h1 className=" text-sm font-semibold mb-1">Liked By</h1>
                <ul className=" flex flex-col gap-2">
                    {likes.map(({id, user}) => (
                        <li key={id} className=" flex items-center gap-1">
                            <Image
                                src={user.image!}
                                alt={user.name}
                                width={20}
                                height={20}
                                className=" rounded-full"
                            />
                            <span className=" text-sm">{user.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
