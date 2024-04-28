"use client"

import {useRouter, useSearchParams} from "next/navigation"

export default function Paginate({
    total,
    search,
}: {
    total: number
    search: string
}) {
    const params = useSearchParams()
    const current = Number(params.get("page")) || 1
    const size = Number(params.get("size")) || 5
    const start = (current - 1) * size
    const end = start + size
    const router = useRouter()
    const hasPrev = start > 0
    const hasNext = end < total
    const nextUrl = search
        ? `?page=${current + 1}&size=${size}&search=${search}`
        : `?page=${current + 1}&size=${size}`
    const prevUrl = search
        ? `?page=${current - 1}&size=${size}&search=${search}`
        : `?page=${current - 1}&size=${size}`

    return (
        <div className=" flex justify-center items-center">
            <button
                className="btn font-semibold disabled:bg-slate-500 disabled:text-white/35 disabled:cursor-not-allowed"
                disabled={!hasPrev}
                onClick={() => router.push(prevUrl)}
            >
                Prev
            </button>
            <span className=" mx-5 font-semibold">{current}</span>
            <button
                className="btn font-semibold disabled:bg-slate-500 disabled:text-white/35 disabled:cursor-not-allowed"
                disabled={!hasNext}
                onClick={() => router.push(nextUrl)}
            >
                Next
            </button>
        </div>
    )
}
