"use client"

import useLocaleStore from "@/stores/useLocaleStore";
import { getUserStatistics } from "@/utils/client/ApiUtils";
import { useState, useEffect } from "react";

export default function UserStatistics() {
    const { dictionary } = useLocaleStore(state => state);
    const [userStatistics, setUserStatistics] = useState<UserStatisticsDto>();

    useEffect(() => {
        getUserStatistics().then(statistics => setUserStatistics(statistics));
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[34px] mb-20 text-xl">
            <div className=" md:border-r-4 border-b-4  border-secondary border-dashed">
                {renderCell(dictionary.common.userPoints, userStatistics?.userPoints)}
            </div>
            <div className="border-b-4 border-secondary border-dashed">
                {renderCell(dictionary.common.toNextLevel, userStatistics?.toNextLevel)}
            </div>
            <div className="md:border-r-4 border-b-4 md:border-b-0  border-secondary border-dashed">
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
            return value.length > 24 ? value : <>{value}<br /></>;
        }
        return <span className="loading loading-ball loading-sm"></span>
    }
}