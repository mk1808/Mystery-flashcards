import Loader from '@/components/Loader'
import React from 'react'

function Loading() {

    return (
        <div className="flex items-center justify-center h-[100px] mt-48">
            <Loader />
        </div>
    )
}

export default Loading