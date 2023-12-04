type StepType = {
    number: string,
    text: string
}

const steps: StepType[] = [
    { number: "1", text: "Tworzysz kolekcję słówek" },
    { number: "2", text: "Dodajesz do niej słówka" },
    { number: "3", text: "Uruchamiasz tryb nauki i poznajesz nowe słownictwo" },
    { number: "4", text: "Wykonujesz test sprawdzający wiedzę" },
    { number: "5", text: "Twój poziom języka rośnie!" }
]

export default function SecondPanel() {

    return (
        <div className="w-full p-12 h-screen">
            {steps.map(renderStep)}
        </div>
    )

    function renderStep(step: StepType, index: number) {
        return (
            <div className='flex items-center h-1/5'>
                {renderSpace(step.number, index)}
                {renderNumberCircle(step.number)}
                <div className='text-4xl font-bold text-secondary h-min'>{step.text}</div>
            </div>
        );
    }

    function renderNumberCircle(number: string) {
        return (
            <div className={`h-[60px] w-[60px] border-[10px] bg-neutral m-5
                rounded-full box-content cursor-pointer inline-flex text-4xl font-bold text-primary
                items-center justify-center border-secondary border-solid`}>
                {number}
            </ div>
        )
    }

    function renderSpace(id: string, amount: number) {
        const amountTemp = [...Object(Array(amount)).keys()];
        return amountTemp.map(index => <div key={index + "_" + id} className='w-1/12'></div>);
    }
}