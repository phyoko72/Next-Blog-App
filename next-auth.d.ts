import type {DefaultSession, DefaultUser, User} from "next-auth"
import type {DefaultJWT} from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: User
        // user: {
        //     id: string
        //     role: string
        // } & DefaultSession
    }
    interface User extends DefaultUser {
        id: string
        role: string
        oki: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        role: string
    }
}
