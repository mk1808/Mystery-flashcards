"use client"

import { useMemo } from "react"

export default function RoundActionButton({
    content,
    size = "h-[60px] w-[60px]",
    borderWidth = "border-[10px]",
    onClick = () => { }
}: {
    content: any,
    size?: string,
    borderWidth?: string,
    onClick?: () => any
}) {

    return (
        <div className={`${size} ${borderWidth}
                rounded-full box-content cursor-pointer inline-flex
                items-center justify-center border-black border-solid`}
            onClick={onClick}>
            {content}
        </div>
    )
}