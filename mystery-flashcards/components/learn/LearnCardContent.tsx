import React, { ReactNode } from 'react'

function LearnCardContent({ questionSide, answerSide }: { questionSide: ReactNode, answerSide: ReactNode }) {
    return (
        <div className="flex-1 grid sm:grid-cols-2 h-full">
            <div className='grid grid-rows-2'>
                {questionSide}
            </div>
            <div className='flex items-center'>
                <div className="divider hidden sm:flex divider-horizontal ml-0" />
                <div className="w-full h-full grid grid-rows-2">
                    {answerSide}
                </div>
            </div>
        </div>
    )
}

export default LearnCardContent