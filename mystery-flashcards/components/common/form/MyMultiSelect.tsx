import { errorSelectClass } from "@/utils/client/FormUtils";
import { useState, useRef } from 'react';

export default function MyMultiSelect({
    label,
    defaultValue = "",
    noValueLabel = "Pick",
    options,
    inputParams = {},
    className = "",
    isValid = true
}: {
    label: string,
    defaultValue?: string,
    noValueLabel?: string,
    options: any[],
    className?: string,
    inputParams?: any,
    isValid?: boolean
}) {
    const optionDropdown = useRef<any>(null);
    const optionSearchInput = useRef<any>(null);

    const stopPropagation = (event: any) => event.stopPropagation()
    const renderOption = ({ value, label }: { value: any, label: any }) => <option value={value} key={value}>{label}</option>;

    function toggleDropdownOpen(event: any) {
        stopPropagation(event);
        if (optionDropdown.current) {
            optionDropdown.current.open = !optionDropdown.current.open
        }
        optionSearchInput.current.focus()
        setTimeout(toggleCloseDropdownEventListener)
    }

    function toggleCloseDropdownEventListener() {
        if (optionDropdown.current.open) {
            window.addEventListener('click', toggleDropdownOpen)
        } else {
            window.removeEventListener('click', toggleDropdownOpen)
        }
    }

    return (
        <label className={`form-control w-full ${className}`}>
            {renderLabel()}
            {renderInput()}
            {renderDropdown()}
        </label>
    )

    function renderLabel() {
        return (
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
        )
    }

    function renderInput() {
        return (
            <div className={`input input-bordered w-full select`} onClick={toggleDropdownOpen} />
        )
    }

    function renderDropdown() {
        return (
            <details className="dropdown" ref={optionDropdown} onClick={stopPropagation}>
                <summary className="invisible h-0" />
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full rounded-none border border-gray-400 border-solid shadow-md " >
                    {renderDropdownContent()}
                </ul>
            </details>
        )
    }

    function renderDropdownContent() {
        return (
            <>
                <input className={`input input-bordered w-full input-sm `} ref={optionSearchInput} />
                <option disabled value="">{noValueLabel}</option>
                {options.map(renderOption)}
            </>
        )
    }

}