import React from 'react'

function SingleSidebarStat({ title, value }: { title: string, value: string }) {
    return (
        <div className="my-3 flex items-center justify-between">
            <div className='w-[180px]'>
                <span className="text-xl font-light">{title}</span>
            </div>
            <div className="text-right">
                <div className="text-2xl font-medium">{value}</div>
            </div>
        </div>
    )
}

export default SingleSidebarStat