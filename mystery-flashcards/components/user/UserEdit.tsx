
import { getDictionary } from "@/dictionaries/dictionaries";
import { use } from "react";

export default function UserEdit({ locale }: { locale: string }) {
    const dictionary = use(getDictionary(locale));
    return (
        <div>
        </div>
    )
}