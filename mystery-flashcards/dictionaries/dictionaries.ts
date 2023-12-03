
type dictionaryType = { pl: any, en: any };

const dictionaries: dictionaryType = {
    en: () => import('./en.json').then((module) => module.default),
    pl: () => import('./pl.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => dictionaries[locale as keyof dictionaryType]();