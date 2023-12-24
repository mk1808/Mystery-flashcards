"use client"

import { getUserStatistics } from "@/utils/client/ApiUtils";
import { useState, useEffect } from "react";

export default function UserStatistics({ dictionary }: { dictionary: any }) {
    const [userStatistics, setUserStatistics] = useState<UserStatisticsDto>();

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
            <div className="grid grid-cols-1 text-center p-6 h-[250px] relative ">
<div className="stats shadow">

                    <div className="stat whitespace-normal">
                        <div className="stat-title whitespace-normal">{title}</div>
                        <div className="stat-value">{renderValueOrLoader(value)}</div>
                    </div>

                </div>
            

            </div>
        );
    }

    function renderValueOrLoader(value: any) {
        if (value != undefined) {
            return value.length>24?value:<>{value}<br/></> ;
        }
        return <span className="loading loading-ball loading-sm"></span>
    }
}