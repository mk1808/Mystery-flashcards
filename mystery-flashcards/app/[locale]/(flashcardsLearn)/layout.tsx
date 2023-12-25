import Sidebar from '@/components/Sidebar'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function FlashcardsLayout({ children, params, sidebar }: { children: any, params: any, sidebar: any }) {
    const dictionary = await fetchDictionary(params.locale);

    return (
        <Sidebar drawerContent={sidebar} dictionary={dictionary}>{children}</Sidebar>
    )
}

export default FlashcardsLayout