import { getDictionary } from "@/dictionaries/dictionaries"

export default async function Page({ params }: { params: { locale: string } }) {
    const dictionary = await getDictionary(params.locale);
    return <div>{dictionary.common.mainPage}</div>
}
