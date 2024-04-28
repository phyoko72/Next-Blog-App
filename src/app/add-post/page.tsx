import AddPostForm from "@/components/AddPostForm"
import {getServerSession} from "next-auth"
import {options} from "../api/auth/[...nextauth]/options"
import {redirect} from "next/navigation"
import {createPost} from "@/lib/actions"
import Warning from "@/components/Warning"

export default async function AddPost() {
    const session = await getServerSession(options)
    if (!session) return <Warning addPost={true} />
    const handleCreatePost = createPost.bind(null, session.user.id)
    return (
        <>
            <h1 className="title text-center my-3">Add Post</h1>
            <AddPostForm postAction={handleCreatePost} />
        </>
    )
}
