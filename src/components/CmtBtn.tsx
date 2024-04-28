"use client"

import Image from "next/image"
import {useContext, useEffect, useRef} from "react"
import {useSession} from "next-auth/react"
import {ToggleContext} from "@/providers/ToggleProvider"
import {createComment, deleteComment} from "@/lib/actions"
import DeleteIcon from "@/../public/trash-2.svg"
import {FormButton} from "./FormButton"
import {useFormState} from "react-dom"

export default function CmtBtn({
    comments,
    postId,
}: {
    comments: CmtType
    postId: string
}) {
    const {data: session} = useSession()

    const {setIsNotiShown, isCmtShown, setIsLikeShown, setIsCmtShown} =
        useContext(ToggleContext)

    const formRef = useRef<HTMLFormElement | null>(null)

    const time = (date: Date) => new Date(date).toLocaleDateString()

    const listToggle = () => {
        if (!session) return setIsNotiShown(true)
        setIsCmtShown((prev) => !prev)
        setIsLikeShown(false)
    }

    const updateCreateComment = createComment.bind(
        null,
        postId,
        session?.user.id!
    )

    const [state, formAction] = useFormState(updateCreateComment, {
        message: "",
        success: true,
    })

    useEffect(() => {
        if (state?.success) formRef.current?.reset()
    }, [state])

    const delCmt = async (id: string) => {
        await deleteComment(id)
    }

    return (
        <div className=" flex flex-col">
            <span
                className=" underline underline-offset-2 cursor-pointer"
                onClick={listToggle}
            >
                {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
            </span>
            <button className="btn w-full" onClick={listToggle}>
                Comment
            </button>
            <div
                className={`${
                    isCmtShown ? "" : "hidden"
                } absolute left-0 right-0 top-16 p-2 bg-post max-h-40 overflow-y-auto`}
            >
                <form
                    action={formAction}
                    ref={formRef}
                    className=" flex gap-x-3 items-center text-black"
                >
                    <textarea
                        name="comment"
                        id="comment"
                        placeholder="Write comment..."
                        className=" w-full h-8 p-1 rounded"
                        required
                    />
                    <FormButton text="Add" />
                </form>
                {comments.length > 0 && (
                    <div>
                        {comments.map(({id, text, user, createdAt, userId}) => (
                            <div
                                key={id}
                                className=" my-1 p-1 border border-white rounded flex justify-between items-center"
                            >
                                <div className=" flex items-start gap-1">
                                    <Image
                                        src={user.image || ""}
                                        alt={user.name}
                                        width={30}
                                        height={30}
                                        className=" rounded-full"
                                    />
                                    <div>
                                        <span className=" text-sm font-semibold me-2">
                                            {user.name}
                                        </span>
                                        <span className=" text-sm">
                                            {time(createdAt)}
                                        </span>
                                        <p>{text}</p>
                                    </div>
                                </div>
                                {userId === session?.user.id && (
                                    <div
                                        className=" cursor-pointer"
                                        onClick={() => delCmt(id)}
                                    >
                                        <Image
                                            src={DeleteIcon}
                                            alt="delete"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
