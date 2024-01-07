"use client"
import useLocaleStore from '@/stores/useLocaleStore';
import React from 'react'

function Sidebar({ children, drawerContent }: any) {
    const { dictionary } = useLocaleStore(state => state);
    return (
        <div className='w-full'>
            <div className="drawer lg:drawer-open">
                {renderTrigger()}
                {renderContent()}
                {renderSidebar()}
            </div>
        </div>
    )

    function renderTrigger() {
        return (
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        )
    }

    function renderContent() {
        return (
            <div className="drawer-content flex flex-col items-center justify-start pt-10 ">
                {renderLabel()}
                <div className='w-full px-5 sidebarOpen:w-[1000px]'>
                    {children}
                </div>
            </div>
        )
    }

    function renderLabel() {
        return dictionary.common.openSidebar && (
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-5">{dictionary.common.openSidebar}</label>
        )
    }

    function renderSidebar() {
        return (
            <div className="drawer-side rounded-e-lg">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />
                <ul className="menu p-4 w-80 min-h-full bg-base-100 lg:bg-base-100/70 text-base-content">
                    {drawerContent}
                </ul>
            </div>
        )
    }
}

export default Sidebar