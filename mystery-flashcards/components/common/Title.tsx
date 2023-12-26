import React from 'react'

function Title({ text }: { text: string }) {

    return (
        <h1 className="text-4xl md:text-5xl font-bold text-center my-3">
            {text}
        </h1>
    )
}

export default Title