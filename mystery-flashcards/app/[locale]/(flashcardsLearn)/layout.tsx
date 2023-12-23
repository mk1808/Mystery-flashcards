import Sidebar from '@/components/Sidebar'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function FlashcardsLayout({ children, locale, sidebar }: { children: any, locale: any, sidebar: any }) {
    const dictionary = await fetchDictionary(locale);

    return (
        <Sidebar drawerContent={sidebar} dictionary={dictionary}>{children}</Sidebar>
    )
}

export default FlashcardsLayout