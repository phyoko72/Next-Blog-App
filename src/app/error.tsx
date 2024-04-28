"use client"

export default function Error({
    error,
    reset,
}: {
    error: Error & {digest?: string}
    reset: () => void
}) {
    return (
        <div>
            <h1 className="title">Something went wrong!</h1>
            <button className="btn" onClick={() => reset()}>
                Try again
            </button>
            <h2>{error.message}</h2>
        </div>
    )
}
