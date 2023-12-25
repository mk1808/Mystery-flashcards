import { create } from "zustand";

type State = {
    locale: string
    dictionary: Dictionary
}

type Action = {
    setLocale: (locale: string) => void,
    setDictionary: (dictionary: Dictionary) => void
}

const useLocaleStore = create<State & Action>((set) => ({
    locale: "pl",
    dictionary: { common: {}, langOptions: {}, levelOptions: {}, statusOptions: {}, userRanges: {} },
    setLocale: (locale: string) => set(() => ({ locale })),
    setDictionary: (dictionary: Dictionary) => set(() => ({ dictionary }))
}))

export default useLocaleStore;