import React from 'react'

function useSubmitTestResultAction({ dictionary }: { dictionary: any }) {
    const mainButtonAttrs: ButtonAttrs = {
        title: "Rozpocznij ponownie",
        type: undefined,
        onClick: () => { }
    }
    const onFinishClick = () => { console.log("finish") }
    const otherButtonAttrs = { onFinishClick, title: "Powrót" }

    return { mainButtonAttrs, otherButtonAttrs };
}

export default useSubmitTestResultAction