import { getDictionary } from "@/dictionaries/dictionaries";

export async function getDictionaryForComponent(locale:string):Promise<any>{
    return await getDictionary(locale);
}