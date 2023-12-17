"use client"
import useSubmitLearnActions from '@/hooks/useSubmitLearnActions';
import useTrainingStore from '@/stores/useTrainingStore';
import React, { useEffect } from 'react'

function LearnSubmitButtons({ dictionary }: { dictionary: any }) {
    const { mainButtonAttrs, otherButtonAttrs } = useSubmitLearnActions({ dictionary })

    return (
        <>
            <button className="btn btn-primary mb-3 btn-wide" {...mainButtonAttrs}>{mainButtonAttrs.title}</button>
            <button className="btn btn-secondary mb-3 btn-wide" onClick={otherButtonAttrs.onFinishClick}>{otherButtonAttrs.title}</button>
        </>
    )
}

export default LearnSubmitButtons