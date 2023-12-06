import Sidebar from '@/components/Sidebar'
import React from 'react'

function FlashcardsLayout({ children, locale, flashcardsSidebar }: { children: any, flashcardsSidebar: any, locale: any }) {
    return (
        <Sidebar drawerContent={flashcardsSidebar}>{children}</Sidebar>
    )
}

export default FlashcardsLayout