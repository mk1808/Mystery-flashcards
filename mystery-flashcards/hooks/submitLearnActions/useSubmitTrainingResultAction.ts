import { useRouter } from 'next/navigation';
import React from 'react'

function useSubmitTrainingResultAction({ dictionary, flashcardSet, locale }: { dictionary: any, flashcardSet: any, locale: any }) {
    const router = useRouter();
    const mainButtonAttrs: ButtonAttrs = {
        title: dictionary.common.tryAgain,
        type: undefined,
        onClick: () => { }
    }
    const onFinishClick = () => { router.push(`/${locale}/flashcards/${flashcardSet?.flashcardSet?._id}`) }
    const otherButtonAttrs = { onFinishClick, title: dictionary.common.goBack }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTrainingResultAction