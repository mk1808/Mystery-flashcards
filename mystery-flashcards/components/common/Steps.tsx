import React from 'react'

function Steps({ steps }: { steps: Step[] }) {

    return (
        <div className="p-4 max-w-xl mx-auto">
            {steps.map(renderStep)}
        </div>
    )

    function renderStep(step: Step, index: number) {
        const isLast = steps.length - 1 === index;
        return (
            <div className="flex" key={step.title}>
                <div className="mr-4 flex flex-col items-center">
                    <div>
                        {renderStepIcon(step)}
                    </div>
                    {!isLast && <div className="h-full w-px bg-gray-300 dark:bg-slate-500" />}
                </div>
                <div className="pt-1 pb-8 text-left">
                    <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">{step.title}</p>
                    <p className="text-gray-600 dark:text-slate-400">{step.description}</p>
                </div>
            </div>
        )
    }

    function renderStepIcon(step: Step) {
        return step.icon || renderDefaultStepIcon();
    }

    function renderDefaultStepIcon() {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    fill="none" className="h-6 w-6 text-blue-800 dark:text-slate-200"
                >
                    <path d="M12 5l0 14"></path>
                    <path d="M18 13l-6 6"></path>
                    <path d="M6 13l6 6"></path>
                </svg>
            </div>
        )
    }
}

export default Steps