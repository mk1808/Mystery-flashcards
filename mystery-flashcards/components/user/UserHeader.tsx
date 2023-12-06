
import { getDictionary } from "@/dictionaries/dictionaries";
import { use } from "react";
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export default function UserHeader({ locale }: { locale: string }) {
    const dictionary = use(getDictionary(locale));
    return (
        <div className="text-center ">
            <div className="text-5xl mb-4">Witaj, X!</div>
            <div className="text-2xl flex items-center place-content-center ">Poziom 3
                <div className='has-tooltip'>
                    <span className='tooltip rounded shadow-lg ms-4 p-1 bg-neutral text-primary -mt-8'>Dostępne poziomy:</span>
                    <InformationCircleIcon className="h-6 w-6 text-secondary" />
                </div>
            </div>
            <div className="text-2xl flex items-center place-content-center ">Ranga: Wilk
            </div>
        </div>
    )
}