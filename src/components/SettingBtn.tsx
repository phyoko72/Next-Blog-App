"use client"

import {deletePost} from "@/lib/actions"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useState} from "react"

export default function SettingBtn({postId}: {postId: string}) {
    const [isBtnOpened, setIsBtnOpened] = useState(false)

    const router = useRouter()
    const delPost = async () => {
        const deletedPost = await deletePost(postId)
        if (deletedPost?.success) {
            router.push("/")
        }
    }
    return (
        <div className=" relative">
            <button
                className=" font-bold text-lg"
                onClick={() => setIsBtnOpened((prev) => !prev)}
            >
                ...
            </button>
            <div
                className={`${
                    isBtnOpened ? "" : "hidden"
                } absolute right-0 bg-gray-200 text-black flex flex-col gap-y-3 md:gap-y-1 p-1 rounded-md`}
            >
                <Link
                    className=" w-full text-start"
                    href={`/posts/edit/${postId}`}
                >
                    Edit
                </Link>

                <button className="w-full text-start" onClick={delPost}>
                    Delete
                </button>
            </div>
        </div>
    )
}
