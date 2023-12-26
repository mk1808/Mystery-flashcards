import useLocaleStore from '@/stores/useLocaleStore';
import { useRouter } from 'next/navigation';

function useSubmitTrainingResultAction({ flashcardSet }: { flashcardSet: any }): MainAndOtherButton {
    const { dictionary, locale } = useLocaleStore(state => state);
    const router = useRouter();

    const onMainClick = () => {
        const modalButton = document.getElementById("modalButton")
        modalButton?.click();
    }
    const onFinishClick = () => { router.push(`/${locale}/flashcards/${flashcardSet?.flashcardSet?._id}`) }

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

export default useSubmitTrainingResultAction