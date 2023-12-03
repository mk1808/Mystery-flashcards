import { getDictionary } from "@/dictionaries/dictionaries";

async function NotFound({ locale }:  { locale: string }) {
    const dictionary = await getDictionary(locale);
    return <div>{dictionary.common.notFound}</div>
}

export default NotFound