export {default} from "next-auth/middleware"

export const config = {
    matcher: ["/add-user", "/posts/edit/:path*", "/my-profile"],
}
