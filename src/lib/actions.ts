"use server"
import {revalidateTag} from "next/cache"
import prisma from "./connect-db"

export async function createPost(
    id: string,
    prevState: {message: string; success: boolean} | undefined,
    formData: FormData
) {
    const title = formData.get("title")?.toString()
    const content = formData.get("content")?.toString()

    if (!title || !content) return {message: "Invalid Input", success: false}
    try {
        await prisma.post.create({
            data: {
                title,
                content,
                user: {connect: {id}},
            },
        })
        revalidateTag("posts")
        return {message: "Post Created Successfully", success: true}
    } catch (err) {
        if (err instanceof Error) return {message: err.message, success: false}
    }
}
export async function editPost(
    id: string,
    prevState: {message: string; success: boolean} | undefined,
    formData: FormData
) {
    const title = formData.get("title")?.toString()
    const content = formData.get("content")?.toString()

    if (!title || !content) return {message: "Invalid Input", success: false}
    try {
        await prisma.post.update({
            where: {id},
            data: {
                title,
                content,
            },
        })
        revalidateTag("posts")
        return {message: "Post Edited Successfully", success: true}
    } catch (err) {
        if (err instanceof Error) return {message: err.message, success: false}
    }
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({
            where: {id},
        })
        revalidateTag("posts")
        return {message: "Post Deleted.", success: true}
    } catch (err) {
        if (err instanceof Error) return {message: err.message, success: false}
    }
}

export async function likePost(postId: string, userId: string) {
    try {
        await prisma.like.create({
            data: {postId, userId},
        })

        revalidateTag("likes")

        return {message: "Like created"}
    } catch (err) {
        if (err instanceof Error) return {message: err.message}
    }
}
export async function unLikePost(id: string) {
    try {
        await prisma.like.delete({where: {id}})

        revalidateTag("likes")
        return {message: "Unliked post"}
    } catch (err) {
        if (err instanceof Error) return {message: err.message}
    }
}

export async function createComment(
    postId: string,
    userId: string,
    prevState: {message: string; success: boolean} | undefined,
    formData: FormData
) {
    const text = formData.get("comment") as string
    console.log({postId, userId, prevState, text})
    try {
        await prisma.comment.create({
            data: {postId, userId, text},
        })
        revalidateTag("cmts")
        return {message: "Comment Created.", success: true}
    } catch (err) {
        if (err instanceof Error) return {message: err.message, success: false}
    }
}

export async function deleteComment(id: string) {
    try {
        const result = await prisma.comment.delete({where: {id}})
        revalidateTag("cmts")
        return {message: "Comment Deleted"}
    } catch (err) {
        if (err instanceof Error) return {message: err.message}
    }
}
