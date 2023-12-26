export const Lang = {
    PL: "pl",
    ENG: "eng",
    GE: "ge",
    FR: "fr",
    ZH: "zh",
    ES: "es",
    PT: "pt",
    RU: "ru"
} as const;

export const LangOptions: Option[] = [
    { value: Lang.PL, label: "langOptions.pl" },
    { value: Lang.ENG, label: "langOptions.en" },
    { value: Lang.GE, label: "langOptions.ge" },
    { value: Lang.FR, label: "langOptions.fr" },
    { value: Lang.ZH, label: "langOptions.zh" },
    { value: Lang.ES, label: "langOptions.es" },
    { value: Lang.PT, label: "langOptions.pt" },
    { value: Lang.RU, label: "langOptions.ru" }
];
