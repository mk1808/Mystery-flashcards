"use client"
import useTrainingStore from '@/stores/useTrainingStore';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { usePathname } from 'next/navigation';
import React from 'react'

function LearnSubmitButtons({ dictionary }: { dictionary: any }) {
    const wasChecked = useTrainingStore((state) => state.wasChecked);
    const onClick = () => { console.log("a") }
    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(wasChecked, onClick);
    const pathname = usePathname();
    const title = pathname.includes("result") ? dictionary.common.answersResultsTitle :
        pathname.includes("training") ? dictionary.common.learnTitle : dictionary.common.testTitle;
    return (
        <>
            <button className="btn btn-primary mb-3 btn-wide" {...mainButtonAttrs}>{mainButtonAttrs.title}</button>
            <button className="btn btn-secondary mb-3 btn-wide">Zakończ naukę</button>
        </>
    )
}

export default LearnSubmitButtons