"use client"
import useTrainingStore from '@/stores/useTrainingStore';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { usePathname } from 'next/navigation';
import React, {useState, useEffect, useRef} from 'react'

function LearnSubmitButtons({ dictionary }: { dictionary: any }) {
    const wasChecked = useTrainingStore((state) => state.wasChecked);
    const [kwasChecked, setKwasChecked] = useState<Boolean>(false);
    const setWasChecked = useTrainingStore((state) => state.setWasChecked);
    const incrementCurrentFlashcardIndexInRound = useTrainingStore((state) => state.incrementCurrentFlashcardIndexInRound);

    const setWasRef = useRef<any>(null)
    setWasRef.current = wasChecked;

    useEffect(()=>{
        setKwasChecked(wasChecked)
    },[wasChecked])

    const onClick = () => {      
      //  console.log("TEST DUPY")
      // setWasRef.current(false);
      //  incrementCurrentFlashcardIndexInRound(); 
   
    }
    console.log("test 123", wasChecked, kwasChecked)
    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(setWasRef.current, onClick);
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