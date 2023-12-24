import React from 'react'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

function SingleSidebarInfo({ title, value }: { title: any, value: any }) {

    return (
        <div className="my-3 flex items-center">
            <ChevronDoubleRightIcon className="h-5 w-6 mr-2 text-gray-800" />
            <span className="text-xl font-light">{title}</span>
            <span className="text-xl font-light">: &nbsp;</span>
            <span className="text-xl font-medium">{value}</span>
        </div>
    )
}

export default SingleSidebarInfo