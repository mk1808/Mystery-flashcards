import { fetchDictionary } from "@/dictionaries/dictionaries";

async function NotFound({ params }: { params: { locale: string } }) {
    const dictionary = await fetchDictionary(params.locale);
    return <div>{dictionary.common.notFound}</div>
}

export default NotFound