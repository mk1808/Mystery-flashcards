
import FirstPanel from "@/components/main/panels/FirstPanel";
import SecondPanel from "@/components/main/panels/SecondPanel";
import { fetchDictionary } from "@/dictionaries/dictionaries"

import FirstSecondDivider from "@/components/main/panels/FirstSecondDivider";
import SecondThirdDivider from "@/components/main/panels/SecondThirdDivider";
import FlashcardSetsSearch from "@/components/main/search/FlashcardSetsSearch";

export default async function Page({ params }: { params: { locale: string } }) {
    const dictionary = await fetchDictionary(params.locale);

    return (
        <>
            <FirstPanel />
            <FirstSecondDivider />
            <SecondPanel dictionary={dictionary} />
            <SecondThirdDivider />

            <FlashcardSetsSearch dictionary={dictionary} locale={params.locale} />
        </>
    )


}
//return <div>{dictionary.common.mainPage}</div>