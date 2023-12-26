import { errorSelectClass } from '@/utils/client/FormUtils';
import React from 'react'

function MySelect({
    label,
    defaultValue = "",
    noValueLabel = "",
    options,
    inputParams,
    className = "",
    isValid = true
}: {
    label: string,
    defaultValue?: string,
    noValueLabel?: string,
    options: Option[],
    className?: string,
    inputParams: any,
    isValid?: boolean
}) {
    const renderOption = ({ value, label }: Option) => <option value={value} key={value}>{label}</option>;
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