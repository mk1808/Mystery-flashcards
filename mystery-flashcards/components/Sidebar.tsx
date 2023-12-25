import useLocaleStore from '@/stores/useLocaleStore';
import React from 'react'

function Sidebar({ children, drawerContent }: any) {
    const { dictionary } = useLocaleStore(state => state);
    return (
        <div className='w-full'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-start pt-10 ">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-5">{dictionary.common.openSidebar}</label>
                    <div className='w-full px-5 sidebarOpen:w-[1000px]'>
                        {children}
                    </div>
                </div>
                <div className="drawer-side rounded-e-lg">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-100 lg:bg-base-100/70 text-base-content">
                        {drawerContent}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar