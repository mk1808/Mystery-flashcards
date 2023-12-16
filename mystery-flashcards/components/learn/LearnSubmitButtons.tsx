"use client"
import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { patchAnswersAndReturnResults } from '@/utils/client/ApiUtils';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react'

function LearnSubmitButtons({ dictionary }: { dictionary: any }) {
    const wasChecked = useTrainingStore((state) => state.wasChecked);
    const roundAnswers = useTrainingStore((state) => state.roundAnswers);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();
    const [kwasChecked, setKwasChecked] = useState<Boolean>(false);

    const setWasRef = useRef<any>(null)
    setWasRef.current = wasChecked;

    useEffect(() => {
        setKwasChecked(wasChecked)
    }, [wasChecked])
    const tempId = "656a2c5d573e1d09a12fd05a";
    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(setWasRef.current);
    const pathname = usePathname();
    const title = pathname.includes("result") ? dictionary.common.answersResultsTitle :
        pathname.includes("training") ? dictionary.common.learnTitle : dictionary.common.testTitle;
    const goToResults = () => router.push(`/learn/training/${tempId}/results`)
    const onFinishClick = async () => {

        try {
            const result = await patchAnswersAndReturnResults(tempId, roundAnswers);
            console.log("finalResult: ", result)
            goToResults();
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
        }

    }

    return (
        <>
            <button className="btn btn-primary mb-3 btn-wide" {...mainButtonAttrs}>{mainButtonAttrs.title}</button>
            <button className="btn btn-secondary mb-3 btn-wide" onClick={onFinishClick}>Zakończ naukę</button>
        </>
    )
}

export default LearnSubmitButtons