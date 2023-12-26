import RoundActionButton from "./RoundActionButton";

function DividerButton({
    content,
    buttonStyle = "",
    containerStyle = "",
    onClick = () => { }
}: {
    content: any,
    buttonStyle?: string,
    containerStyle?: string,
    onClick?: () => any
}) {

    return (
        <div className={`w-full ${containerStyle}`}>
            <div className="w-full border-solid border-b-4 border-secondary" />
            <div className={`w-full flex justify-center ${buttonStyle}`}>
                <RoundActionButton styles="border-secondary text-primary bg-neutral" content={content} onClick={onClick} />
            </div>
        </div>
    )
}

export default DividerButton