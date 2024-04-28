"use client"

import {useFormStatus} from "react-dom"

export function FormButton({text = "Submit"}: {text?: string}) {
    const {pending} = useFormStatus()

    return (
        <button
            className={`btn ${
                text == "Submit" ? "w-full" : ""
            } disabled:bg-slate-800`}
            type="submit"
            aria-disabled={pending}
        >
            {pending ? "Loading..." : text}
        </button>
    )
}
