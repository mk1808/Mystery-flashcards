import Sidebar from '@/components/Sidebar'
import React from 'react'

function FlashcardsLayout({ children, locale, sidebar }: { children: any, locale: any, sidebar:any }) {
    
    return (
        <Sidebar drawerContent={sidebar}>{children}</Sidebar>
    )
}

export default FlashcardsLayout