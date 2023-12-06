
import { getDictionary } from "@/dictionaries/dictionaries";
import { use } from "react";

export default function UserStatistics({ locale }: { locale: string }) {
    const dictionary = use(getDictionary(locale));
    return (
        <div className="grid grid-cols-2 mt-10 text-xl">
            <div className="border-r-4 border-b-4  border-secondary border-dashed">
                {renderCell("Liczba punktów", "300")}
            </div>
            <div className="border-b-4 border-secondary border-dashed">
                {renderCell("Do następnego poziomu brakuje", "300")}
            </div>
            <div className="border-r-4 border-secondary border-dashed">
                {renderCell("Liczba testów", "10")}
            </div>
            <div>
                {renderCell("Liczba nauczonych słówek", "10")}
            </div>
        </div>
    )

    function renderCell(title: string, value: string) {
        return (
            <div className="grid grid-cols-1 text-center p-10">
                <div className="h-[100px]">{title}</div>
                <div>{value}</div>
            </div>
        );
    }
}