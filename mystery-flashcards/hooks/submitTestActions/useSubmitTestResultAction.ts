import useLocaleStore from '@/stores/useLocaleStore';
import useTrainingStore from '@/stores/useTrainingStore';
import { useRouter } from 'next/navigation';

function useSubmitTestResultAction(): MainAndOtherButton {
    const { dictionary, locale } = useLocaleStore(state => state);
    const { flashcardSet: { flashcardSet } } = useTrainingStore((state) => state);
    const router = useRouter();

    const onMainClick = () => {
        const modalButton = document.getElementById("modalButton")
        modalButton?.click();
    }
    const onFinishClick = () => router.push(`/${locale}/flashcards/${flashcardSet?._id}`)

    const mainButtonAttrs: ButtonAttrs = {
        title: dictionary.common.tryAgain,
        type: undefined,
        onClick: onMainClick
    }
    const otherButtonAttrs: ButtonAttrs = { 
        title: dictionary.common.goBack,
        onClick: onFinishClick 
    }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTestResultAction