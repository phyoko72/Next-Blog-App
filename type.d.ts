type ServerActionType = (
    prevState:
        | {
              message: string
              success: boolean
          }
        | undefined,
    formData: FormData
) => Promise<
    | {
          message: string
          success: boolean
      }
    | undefined
>

type PostDataType =
    | {
          id: string
          title: string
          content: string
          userId: string
          createdAt: Date
          updatedAt: Date
      }
    | null
    | undefined

type PostType =
    | {
          user: {
              name: string
              image: string | null
          }
      } & {
          id: string
          title: string
          content: string
          userId: string
          createdAt: Date
          updatedAt: Date
      }

type LikeFunctionType = (
    postId: string,
    userId: string
) => Promise<
    | {
          message: string
      }
    | undefined
>
type UnLikeFunctionType = (id: string) => Promise<
    | {
          message: string
      }
    | undefined
>

type LikeType = {
    user: {
        image: string | null
        name: string
    }
} & {
    id: string
    userId: string
    postId: string
    createdAt: Date
    updatedAt: Date
}

type CmtType = ({
    user: {
        name: string
        image: string | null
    }
} & {
    id: string
    userId: string
    postId: string
    text: string
    createdAt: Date
    updatedAt: Date
})[]
