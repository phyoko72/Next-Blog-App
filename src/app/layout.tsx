import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import AuthProviders from "@/providers/AuthProviders"
import ToggleProvider from "@/providers/ToggleProvider"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-body text-white`}>
                <section className=" w-[95%] sm:w-4/5 lg:w-3/5 m-auto relative select-none">
                    <AuthProviders>
                        <ToggleProvider>
                            <Nav />
                            {children}
                        </ToggleProvider>
                    </AuthProviders>
                </section>
            </body>
        </html>
    )
}
