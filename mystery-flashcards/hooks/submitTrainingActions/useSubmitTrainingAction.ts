import useLocaleStore from '@/stores/useLocaleStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { patchAnswersAndReturnResults } from '@/utils/client/ApiUtils';
import { getMainButtonAttrs } from '@/utils/client/TrainingUtils';
import { useRouter } from 'next/navigation';
import { useRef } from 'react'
import useAlert from '../useAlert';

function useSubmitTrainingAction(): MainAndOtherButton {
    const { dictionary, locale } = useLocaleStore(state => state);
    const { wasChecked, roundAnswers, flashcardSet: { flashcardSet } } = useTrainingStore((state) => state);
    const { setFinalResult } = useTrainingStore((state) => state);
    const { addErrorAlert } = useAlert()
    const router = useRouter();

    const flashcardSetRef = useRef<any>(null)
    flashcardSetRef.current = flashcardSet;
    const roundAnswersRef = useRef<any>(null)
    roundAnswersRef.current = roundAnswers;

    const goToResults = () => router.push(`/${locale}/learn/training/${flashcardSetRef.current._id}/results`)
    const onFinishClick = async () => {
        try {
            const result = await patchAnswersAndReturnResults(flashcardSetRef.current._id, roundAnswersRef.current);
            setFinalResult(result);
            goToResults();
        } catch (errorResponse: any) {
            addErrorAlert(errorResponse.body.message);
        }   
    }
    
    const mainButtonAttrs: ButtonAttrs = getMainButtonAttrs(wasChecked, dictionary);
    const otherButtonAttrs: ButtonAttrs = {
        title: dictionary.common.endLearning,
        onClick: onFinishClick
    }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTrainingAction