"use client"

import useLocaleStore from "@/stores/useLocaleStore"
import { useEffect } from "react";

export default function ProvideLocale({
    locale,
    dictionary
}: {
    locale: string
    dictionary: any
}) {
    const { setDictionary, setLocale } = useLocaleStore(state => state);

    useEffect(updateStore, [locale, dictionary])

    function updateStore() {
        setTimeout(() => {
            setDictionary(dictionary);
            setLocale(locale);
        }, 100)
    }

    return <></>
}