import { errorSelectClass } from '@/utils/client/FormUtils';
import React from 'react'

function MySelect({
    label,
    defaultValue = "",
    noValueLabel = "Pick",
    options,
    inputParams,
    className = "",
    isValid = true
}: {
    label: string,
    defaultValue?: string,
    noValueLabel?: string,
    options: any[],
    className?: string,
    inputParams: any,
    isValid?: boolean
}) {
    const renderOption = ({ value, label }: { value: any, label: any }) => <option value={value} key={value}>{label}</option>;
    return (
        <label className={`form-control w-full ${className}`}>
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select className={`select select-bordered w-full mb-3  ${errorSelectClass(isValid)}`}
                defaultValue={defaultValue}
                {...inputParams}>
                <option disabled value="">{noValueLabel}</option>
                {options.map(renderOption)}
            </select>
        </label>
    )
}

export default MySelect