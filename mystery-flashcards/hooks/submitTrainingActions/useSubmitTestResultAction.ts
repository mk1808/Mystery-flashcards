import useTrainingStore from '@/stores/useTrainingStore';
import { useRouter } from 'next/navigation';
import React from 'react'

function useSubmitTestResultAction({ dictionary, locale }: { dictionary: any, locale: any }) {
    const { flashcardSet: { flashcardSet } } = useTrainingStore((state) => state);
    const router = useRouter();
    const mainButtonAttrs: ButtonAttrs = {
        title: dictionary.common.tryAgain,
        type: undefined,
        onClick: () => {
            const modalButton = document.getElementById("modalButton")
            modalButton?.click();
        }
    }
    const onFinishClick = () => { router.push(`/${locale}/flashcards/${flashcardSet?._id}`) }
    const otherButtonAttrs = { onFinishClick, title: dictionary.common.goBack }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTestResultAction