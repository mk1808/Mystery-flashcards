"use client"

import useRest from "@/hooks/useRest";
import { useState, useEffect } from "react";

export default function UserStatistics({ dictionary }: { dictionary: any }) {
    const [userStatistics, setUserStatistics] = useState<UserStatisticsDto>();
    const getUserStatistics = useRest().getUserStatistics;

    useEffect(() => {
        getUserStatistics().then(statistics => setUserStatistics(statistics));
    }, [])

    return (
        <div className="grid grid-cols-2 my-20 text-xl">
            <div className="border-r-4 border-b-4  border-secondary border-dashed">
                {renderCell(dictionary.common.userPoints, userStatistics?.userPoints)}
            </div>
            <div className="border-b-4 border-secondary border-dashed">
                {renderCell(dictionary.common.toNextLevel, userStatistics?.toNextLevel)}
            </div>
            <div className="border-r-4 border-secondary border-dashed">
                {renderCell(dictionary.common.userTestsCount, userStatistics?.userTestsCount)}
            </div>
            <div>
                {renderCell(dictionary.common.learnedWordsCount, userStatistics?.learnedWordsCount)}
            </div>
        </div>
    )

    function renderCell(title: string, value: any) {
        return (
            <div className="grid grid-cols-1 text-center p-10 h-[250px] relative">
                <div className="font-bold">{title}</div>
                <div className="absolute bottom-20 w-full">{renderValueOrLoader(value)}</div>
            </div>
        );
    }

    function renderValueOrLoader(value: any) {
        if (value != undefined) {
            return value;
        }
        return <span className="loading loading-ball loading-sm"></span>
    }
}