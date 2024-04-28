"use client"

import {Dispatch, SetStateAction, createContext, useState} from "react"

type DataType = {
    isNotiShown: boolean
    setIsNotiShown: Dispatch<SetStateAction<boolean>>
    isCmtShown: boolean
    setIsCmtShown: Dispatch<SetStateAction<boolean>>
    isLikeShown: boolean
    setIsLikeShown: Dispatch<SetStateAction<boolean>>
}

export const ToggleContext = createContext<DataType>({} as DataType)

export default function ToggleProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [isNotiShown, setIsNotiShown] = useState(false)
    const [isCmtShown, setIsCmtShown] = useState(false)
    const [isLikeShown, setIsLikeShown] = useState(false)
    return (
        <ToggleContext.Provider
            value={{
                isNotiShown,
                setIsNotiShown,
                isCmtShown,
                setIsCmtShown,
                isLikeShown,
                setIsLikeShown,
            }}
        >
            {children}
        </ToggleContext.Provider>
    )
}
