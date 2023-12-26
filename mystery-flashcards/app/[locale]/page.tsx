
import FirstPanel from "@/components/main/panels/FirstPanel";
import SecondPanel from "@/components/main/panels/SecondPanel";

import FirstSecondDivider from "@/components/main/panels/FirstSecondDivider";
import SecondThirdDivider from "@/components/main/panels/SecondThirdDivider";
import FlashcardSetsSearch from "@/components/main/search/FlashcardSetsSearch";

async function Page() {

    return (
        <>
            <FirstPanel />
            <FirstSecondDivider />
            <SecondPanel />
            <SecondThirdDivider />

            <FlashcardSetsSearch />
        </>
    )
}
export default Page