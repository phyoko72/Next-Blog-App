"use client"

import {useFormState} from "react-dom"
import {FormButton} from "./FormButton"
import {useRouter} from "next/navigation"
import {useEffect} from "react"

export default function AddPostForm({
    postAction,
    post,
    btnText,
}: {
    postAction: ServerActionType
    post?: PostDataType
    btnText?: string
}) {
    const [state, formActions] = useFormState(postAction, {
        message: "",
        success: true,
    })

    const router = useRouter()

    useEffect(() => {
        if (state?.success && state.message) {
            const timeout = setTimeout(() => {
                router.push(btnText === "Edit" ? `/posts/${post?.id}` : "/")
            }, 1500)
            return () => clearTimeout(timeout)
        }
    }, [state])

    return (
        <div className=" w-[90%] sm:w-4/5 m-auto">
            <form action={formActions}>
                <label htmlFor="title" className=" mb-2 block font-semibold">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="input"
                    placeholder="Title"
                    defaultValue={post?.title}
                    required
                />
                <label htmlFor="content" className=" mb-2 block font-semibold">
                    Content
                </label>
                <textarea
                    name="content"
                    id="content"
                    cols={30}
                    rows={5}
                    className="input"
                    placeholder="What's on your mind?"
                    defaultValue={post?.content}
                    required
                />
                <FormButton text={btnText} />
            </form>
            {state?.success && state.message && (
                <h1 className=" text-xl font-bold py-3 my-2 text-center bg-green-700 text-white rounded">
                    {state?.message}
                </h1>
            )}
            {state?.success === false && state.message && (
                <h1 className=" text-xl font-bold py-3 my-2 text-center bg-red-700 text-white rounded">
                    Something went wrong!
                </h1>
            )}
        </div>
    )
}
