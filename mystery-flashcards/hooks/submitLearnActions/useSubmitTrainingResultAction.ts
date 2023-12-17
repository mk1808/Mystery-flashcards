import React from 'react'

function useSubmitTrainingResultAction({ dictionary }: { dictionary: any }) {
    const mainButtonAttrs: ButtonAttrs = {
        title: "Rozpocznij ponownie",
        type: undefined,
        onClick: () => { }
    }
    const onFinishClick = ()=>{ console.log("finish")}
    const otherButtonAttrs = { onFinishClick, title: "Powrót" }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTrainingResultAction