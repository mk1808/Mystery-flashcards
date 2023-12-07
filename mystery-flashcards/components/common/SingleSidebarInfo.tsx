import React from 'react'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

function SingleSidebarInfo({ title, value }: { title: any, value: any }) {

    return (
        <div className="my-3 flex items-center">
            <ChevronDoubleRightIcon className="h-5 w-5 mr-2 text-gray-500" />
            <span className="text-xl">{title}</span>
            <span className="text-xl">: &nbsp;</span>
            <span className="text-xl">{value}</span>
        </div>
    )
}

export default SingleSidebarInfo