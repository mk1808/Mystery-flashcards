
import { getDictionary } from "@/dictionaries/dictionaries";
import { use } from "react";

export default function UserStatistics({ locale }: { locale: string }) {
    const dictionary = use(getDictionary(locale));
    return (
        <div className="grid grid-cols-2 mt-10 text-xl">
            <div className="border-r-4 border-b-4  border-secondary border-dashed">
                {renderCell(dictionary.common.userPoints, "300")}
            </div>
            <div className="border-b-4 border-secondary border-dashed">
                {renderCell(dictionary.common.toNextLevel, "300")}
            </div>
            <div className="border-r-4 border-secondary border-dashed">
                {renderCell(dictionary.common.userTestsCount, "10")}
            </div>
            <div>
                {renderCell(dictionary.common.learnedWordsCount, "10")}
            </div>
        </div>
    )

    function renderCell(title: string, value: string) {
        return (
            <div className="grid grid-cols-1 text-center p-10">
                <div className="font-bold">{title}</div>
                <div className="mt-[40px] mb-[20px]">{value}</div>
            </div>
        );
    }
}