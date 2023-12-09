'use client'
import React from 'react'
import { use } from "react";
import Title from '../common/Title'
import { usePathname } from 'next/navigation'

function LearnTitle({ dictionary }: { dictionary: any }) {
    const pathname = usePathname();
    const title = pathname.includes("result") ? dictionary.common.answersResultsTitle :
        pathname.includes("training") ? dictionary.common.learnTitle : dictionary.common.testTitle;
    return (
        <div className="flex flex-col justify-around items-center h-[140px]">
            <Title text={title}></Title>
        </div>
    )
}

export default LearnTitle