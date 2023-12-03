import Sidebar from '@/components/Sidebar'
import React from 'react'

function FlashcardsLayout() {
    return (
        <Sidebar drawerContent={getContent()}>content</Sidebar>
    )

    function getContent() {
        return <p>Some content in sidebar</p>
    }
}

export default FlashcardsLayout