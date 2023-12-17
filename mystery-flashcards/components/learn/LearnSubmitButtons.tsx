"use client"
import useSubmitLearnAction from '@/hooks/useSubmitLearnAction';
import React from 'react'

function LearnSubmitButtons({ dictionary }: { dictionary: any }) {
    const { mainButtonAttrs, otherButtonAttrs } = useSubmitLearnAction({ dictionary })

    return (
        <>
            <button className="btn btn-primary mb-3 btn-wide" {...mainButtonAttrs}>{mainButtonAttrs.title}</button>
            <button className="btn btn-secondary mb-3 btn-wide" onClick={otherButtonAttrs.onFinishClick}>{otherButtonAttrs.title}</button>
        </>
    )
}

export default LearnSubmitButtons