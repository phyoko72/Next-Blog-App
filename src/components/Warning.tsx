"use client"

import {ToggleContext} from "@/providers/ToggleProvider"
import {useRouter} from "next/navigation"
import {useContext} from "react"

export default function Warning({addPost = false}: {addPost: boolean}) {
    const router = useRouter()
    const {isNotiShown, setIsNotiShown} = useContext(ToggleContext)
    return (
        <div
            className={` ${
                addPost ? "" : isNotiShown ? "" : "hidden"
            } fixed bg-body bg-opacity-50 p-1 rounded top-0 right-0 bottom-0 left-0 `}
        >
            <div className=" flex flex-col items-center bg-post p-4 rounded gap-7 mt-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white">
                    You Need to Sign In First!
                </h1>
                <div>
                    <button
                        className=" bg-red-700 px-2 py-1 rounded me-3"
                        onClick={() => {
                            if (addPost) {
                                router.push("/")
                            }
                            setIsNotiShown(false)
                        }}
                    >
                        No, thanks.
                    </button>
                    <button
                        className=" bg-green-700 px-2 py-1 rounded"
                        onClick={() => router.push("/api/auth/signin")}
                    >
                        Yes, Sign In.
                    </button>
                </div>
            </div>
        </div>
    )
}
