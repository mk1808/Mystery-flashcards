import { errorToggleClass } from "@/utils/client/FormUtils";

export default function MyToggle({
    label,
    className = "toggle-primary",
    inputParams,
    isValid = true
}: {
    label: string,
    placeholder?: string,
    className?: string,
    inputParams: any,
    type?: string,
    isValid?: boolean
}) {

    return (
        <label className={`label cursor-pointer justify-start ${errorToggleClass(isValid)}`}>
            <input type="checkbox" className={`toggle ${className}`}  {...inputParams} />
            <span className={`ms-5`} >{label}</span>
        </label>
    );
}