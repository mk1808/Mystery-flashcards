import Sidebar from '@/components/Sidebar'
import React from 'react'

async function FlashcardsLayout({ children, sidebar }: { children: any, sidebar: any }) {

    return (
        <Sidebar drawerContent={sidebar}>{children}</Sidebar>
    )
}

export default FlashcardsLayout