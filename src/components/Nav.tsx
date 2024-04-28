"use client"
import {useSession} from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"

export default function Nav() {
    const pathname = usePathname()

    const {data: session, status} = useSession()

    const links = [
        {
            id: 1,
            href: "/",
            name: "Home",
        },
        {
            id: 2,
            href: "/add-post",
            name: "Add Post",
        },
        {
            id: 3,
            href: "/my-profile",
            name: "Profile",
        },

        {
            id: 4,
            href: session ? "/api/auth/signout" : "/api/auth/signin",
            name:
                status === "loading" ? "Loading" : session ? "Logout" : "Login",
        },
    ]

    return (
        <nav className=" my-8">
            <ul className=" flex justify-between sm:justify-around items-center">
                {links.map((link) => {
                    return (
                        <li
                            key={link.id}
                            className={`${
                                pathname === link.href
                                    ? " underline underline-offset-4"
                                    : ""
                            } ${
                                link.href === "/my-profile"
                                    ? session
                                        ? ""
                                        : "hidden"
                                    : ""
                            }`}
                        >
                            <Link href={link.href}>
                                <div className="flex gap-x-1">
                                    {link.href === "/my-profile" && session && (
                                        <Image
                                            src={session.user?.image!}
                                            alt={session.user.name || "profile"}
                                            width={20}
                                            height={20}
                                            className=" rounded-full"
                                        />
                                    )}
                                    {link.name}
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
