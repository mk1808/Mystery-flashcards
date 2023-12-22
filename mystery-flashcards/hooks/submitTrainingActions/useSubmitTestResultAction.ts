import { useRouter } from 'next/navigation';
import React from 'react'

function useSubmitTestResultAction({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
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

export default useSubmitTestResultAction