"use client"

import {useRouter, useSearchParams} from "next/navigation"
import {FormEvent} from "react"
import SearchIcon from "@/../public/search.svg"
import ClearIcon from "@/../public/clear.svg"
import Image from "next/image"

export default function Search() {
    const router = useRouter()
    const params = useSearchParams()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const text = e.currentTarget.search.value.trim()
        if (!text) return
        router.push(`?page=1&size=5&search=${text}`)
    }
    return (
        <div className=" my-2">
            <form onSubmit={handleSubmit}>
                <div className=" flex items-center gap-x-1">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        required
                        className=" search-input"
                    />
                    <div className=" flex items-center gap-x-1">
                        <button
                            className={` ${
                                params.get("search") ? "" : "hidden"
                            } clear-btn disabled:bg-slate-500 disabled:cursor-not-allowed`}
                            disabled={!params.get("search")}
                            onClick={() => router.push("/")}
                            type="reset"
                        >
                            <Image
                                src={ClearIcon}
                                alt="clear"
                                width={25}
                                height={25}
                            />
                        </button>
                        <button className="search-btn">
                            <Image
                                src={SearchIcon}
                                alt="search"
                                width={25}
                                height={25}
                            />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
