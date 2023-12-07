import React from 'react'

function SingleSidebarStat({title, value}:{title:any, value:any}) {
    return (
        <div className="my-3 flex items-center justify-between">
            <div className='w-[210px]'>
                <span className="text-xl">{title}</span>
            </div>
            <div className="text-right">
                <div className="text-2xl">{value}</div>
            </div>
        </div>
    )
}

export default SingleSidebarStat