"use client"

import { useMemo } from "react"

export default function RoundActionButton({
    content,
    styles = "",
    border = "border-[10px]",
    onClick = () => { }
}: {
    content: any,
    styles?: string,
    border?: string,
    onClick?: () => any
}) {

    return (
        <div className={`h-[60px] w-[60px] ${border}
                rounded-full box-content cursor-pointer inline-flex
                items-center justify-center border-black border-solid ${styles}`}
            onClick={onClick}>
            {content}
        </div>
    )
}