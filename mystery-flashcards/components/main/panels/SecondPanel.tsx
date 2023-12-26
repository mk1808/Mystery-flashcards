"use client"
import useLocaleStore from "@/stores/useLocaleStore";
import RoundActionButton from "../../common/RoundActionButton";

type StepType = {
    number: string,
    text: string
}

function SecondPanel() {
    const { dictionary } = useLocaleStore(state => state);

    const steps: StepType[] = [
        { number: "1", text: dictionary.common.mainInstructionStep1 },
        { number: "2", text: dictionary.common.mainInstructionStep2 },
        { number: "3", text: dictionary.common.mainInstructionStep3 },
        { number: "4", text: dictionary.common.mainInstructionStep4 },
        { number: "5", text: dictionary.common.mainInstructionStep5! }
    ]

    return (
        <div className="w-full p-4 sm:p-12 h-screen" id='secondPanel'>
            {steps.map(renderStep)}
        </div>
    )

    function renderStep(step: StepType, index: number) {
        return (
            <div key={step.number} className='flex h-1/5 pt-10'>
                {renderSpace(step.number, index)}
                {renderNumberCircle(step.number)}
                <div className=' text-xl md:text-3xl lg:text-4xl text-black h-min p-3 bg-base-100 rounded-md '>{step.text}</div>
            </div>
        );
    }

    function renderNumberCircle(number: string) {
        return (
            <div>
                <RoundActionButton content={number} border="border-[5px]" styles="bg-neutral me-5 text-4xl font-bold text-primary border-secondary " />
            </div>
        )
    }

    function renderSpace(id: string, amount: number) {
        const amountTemp = [...Object(Array(amount + 1)).keys()];
        return (
            <div className="flex">
                {amountTemp.map(index => <div key={index + "_" + id} className='w-[0px] sm:w-[2vw] md:w-[5vw] h-full xs:hidden' />)}
            </div>
        );
    }
}

export default SecondPanel