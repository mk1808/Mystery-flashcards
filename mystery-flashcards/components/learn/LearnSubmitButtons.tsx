"use client"
import useSubmitLearnActions from '@/hooks/useSubmitLearnActions';
import useTrainingStore from '@/stores/useTrainingStore';
import React, { useEffect } from 'react'

function LearnSubmitButtons({ dictionary, locale }: { dictionary: any, locale: any }) {
    const { mainButtonAttrs, otherButtonAttrs } = useSubmitLearnActions({ dictionary, locale })

    return (

        <div className='flex flex-row gap-36 mt-12 items-center'>
            <button className="btn btn-secondary btn-outline mb-3 btn-wide btn-lg bg-base-100/60" onClick={otherButtonAttrs.onFinishClick}>{otherButtonAttrs.title}</button>
            <button className="btn btn-primary btn-lg mb-3 btn-wide" {...mainButtonAttrs}>{mainButtonAttrs.title}</button>
            
        </div>
    )
}

export default LearnSubmitButtons