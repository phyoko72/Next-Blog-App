import prisma from "@/lib/connect-db"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import type {NextAuthOptions} from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
    jwt: {maxAge: 60 * 60 * 24},
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    },
}
