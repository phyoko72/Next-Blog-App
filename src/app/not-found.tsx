import Link from "next/link"

export default function NotFound() {
    return (
        <div className=" flex justify-center items-center h-[60vh]">
            <div className=" text-center">
                <h1 className="title">Page Not Found!</h1>
                <Link
                    className=" text-xl font-semibold underline underline-offset-2"
                    href="/"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
