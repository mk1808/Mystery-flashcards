import React from 'react'

function MySelect({
    label,
    defaultValue = "Pick one",
    options,
    className = ""
}: {
    label: string,
    defaultValue?: string,
    options: any[],
    className?: string
}) {
    const renderOption = ({ value, label }: { value: any, label: any }) => <option value={value}>{label}</option>;
    return (
        <label className={`form-control w-full ${className}`}>
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select className="select select-bordered w-full" defaultValue={defaultValue}>
                <option disabled>{defaultValue}</option>
                {options.map(renderOption)}
            </select>
        </label>
    )
}

export default MySelect