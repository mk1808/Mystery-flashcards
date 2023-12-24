import RoundActionButton from "../../common/RoundActionButton";

type StepType = {
    number: string,
    text: string
}


export default function SecondPanel({
    dictionary
}: {
    dictionary: any
}) {

    const steps: StepType[] = [
        { number: "1", text: dictionary.common.mainInstructionStep1 },
        { number: "2", text: dictionary.common.mainInstructionStep2 },
        { number: "3", text: dictionary.common.mainInstructionStep3 },
        { number: "4", text: dictionary.common.mainInstructionStep4 },
        { number: "5", text: dictionary.common.mainInstructionStep5! }
    ]

    return (
        <div className="w-full p-12 h-screen" id='secondPanel'>
            {steps.map(renderStep)}
        </div>
    )

    function renderStep(step: StepType, index: number) {
        return (
            <div className='flex items-center h-1/5' key={step.number}>
                {renderSpace(step.number, index)}
                {renderNumberCircle(step.number)}
                <div className='text-4xl  text-black h-min p-3 bg-base-100 rounded-md'>{step.text}</div>
            </div>
        );
    }

    function renderNumberCircle(number: string) {
        return <RoundActionButton content={number} border="border-[5px]" styles="bg-neutral m-5 text-4xl font-bold text-primary border-secondary" />
    }

    function renderSpace(id: string, amount: number) {
        const amountTemp = [...Object(Array(amount)).keys()];
        return amountTemp.map(index => <div key={index + "_" + id} className='w-1/12'></div>);
    }
}