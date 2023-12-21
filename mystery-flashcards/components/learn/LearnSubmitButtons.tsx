"use client"
import useSubmitLearnActions from '@/hooks/useSubmitLearnActions';
import useTrainingStore from '@/stores/useTrainingStore';
import React, { useEffect } from 'react'

function LearnSubmitButtons({ dictionary }: { dictionary: any }) {
    const { mainButtonAttrs, otherButtonAttrs } = useSubmitLearnActions({ dictionary })

    return (
        
        <div className='flex flex-col mt-8'>
            <button className="btn btn-primary mb-3 btn-wide" {...mainButtonAttrs}>{mainButtonAttrs.title}</button>
            <button className="btn btn-secondary mb-3 btn-wide" onClick={otherButtonAttrs.onFinishClick}>{otherButtonAttrs.title}</button>
        </div>
    )
}

export default LearnSubmitButtons