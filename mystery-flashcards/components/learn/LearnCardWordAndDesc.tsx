import React from 'react'

function LearnCardWordAndDesc({ word, description }: { word?: string, description?: string }) {

    return (
        <>
            <div className='self-end'>
                <h1 className="text-3xl my-3">{word ?? ""}</h1>
            </div>
            <div>
                <p>{description ?? ""}</p>
            </div>
        </>
    )

}

export default LearnCardWordAndDesc