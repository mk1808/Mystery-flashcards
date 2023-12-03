import Sidebar from '@/components/Sidebar'
import React from 'react'

function LearnLayout({ children }: { children: any }) {
    return (
        <Sidebar drawerContent={getDrawerContent()}>{children}</Sidebar>
    )

    function getDrawerContent() {
        return <p>Some content in sidebar</p>
    }
}

export default LearnLayout