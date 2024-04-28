"use client"
import {FormButton} from "./FormButton"
import {useFormState} from "react-dom"

export default function UpdateUserForm({
    updateFun,
    name,
    email,
}: {
    updateFun: (
        prevState:
            | {
                  message: string
              }
            | undefined,
        formData: FormData
    ) => Promise<
        | {
              message: string
          }
        | undefined
    >
    name: string
    email: string
}) {
    const initialState = {message: ""}

    const [state, formAction] = useFormState(updateFun, initialState)

    return (
        <>
            <form action={formAction}>
                <input
                    className="input"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={name!!}
                />
                <input
                    className="input"
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={email!!}
                />
                <FormButton text="Update User" />
            </form>
            {state?.message && <p className="noti">{state.message}</p>}
        </>
    )
}
