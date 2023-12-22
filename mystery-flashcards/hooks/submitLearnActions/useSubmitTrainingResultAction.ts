import { useRouter } from 'next/navigation';
import React from 'react'

function useSubmitTrainingResultAction({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    const router = useRouter();
    const mainButtonAttrs: ButtonAttrs = {
        title: dictionary.common.tryAgain,
        type: undefined,
        onClick: () => { }
    }
    const onFinishClick = () => { router.push(`/flashcards/${flashcardSet?.flashcardSet?._id}`) }
    const otherButtonAttrs = { onFinishClick, title: dictionary.common.goBack }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTrainingResultAction