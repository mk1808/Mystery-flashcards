import useLocaleStore from '@/stores/useLocaleStore';
import { useRouter } from 'next/navigation';
import React from 'react'

function useSubmitTrainingResultAction({ flashcardSet }: { flashcardSet: any }) {
    const { dictionary, locale } = useLocaleStore(state => state);
    const router = useRouter();
    const mainButtonAttrs: ButtonAttrs = {
        title: dictionary.common.tryAgain,
        type: undefined,
        onClick: () => {
            const modalButton = document.getElementById("modalButton")
            modalButton?.click();
        }
    }
    const onFinishClick = () => { router.push(`/${locale}/flashcards/${flashcardSet?.flashcardSet?._id}`) }
    const otherButtonAttrs = { onFinishClick, title: dictionary.common.goBack }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTrainingResultAction