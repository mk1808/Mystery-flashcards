import { errorSelectClass } from "@/utils/client/FormUtils";
import { useState, useRef } from 'react';
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { excludeFromArray } from "@/utils/server/arrayUtils";


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
    const [selected, setSelected] = useState<any[]>([])

    const optionDropdown = useRef<any>(null);
    const optionSearchInput = useRef<any>(null);

    const stopPropagation = (event: any) => event.stopPropagation()
    const onSelect = (option: any) => setSelected(selected => [...selected, option]);
    const onDeselect = (option: any) => setSelected(selected => excludeFromArray([...selected], option));

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

    function onCheckboxChange(event: any) {
        const option = options.find(option => option.value === event.target.value)
        if (event.target.checked) {
            onSelect(option)
        } else {
            onDeselect(option)
        }
    }

    function onBadgeClick(event: any, option: any) {
        stopPropagation(event)
        onDeselect(option)
        const indexOfOption = options.findIndex(optionElement => optionElement.value === option.value)
        optionDropdown.current.querySelectorAll(".select-option input")[indexOfOption].checked = false
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
            <div className={`input input-bordered w-full select`} onClick={toggleDropdownOpen} >
                {renderSelectedBadges()}
            </div>
        )
    }

    function renderSelectedBadges() {
        return (
            <div className="flex items-center">
                {selected.map(renderBadge)}
            </div>
        )
    }

    function renderBadge(option: any) {
        return <div className="badge badge-secondary badge-outline mr-2" key={option.value} onClick={(event) => onBadgeClick(event, option)}>{option.label}</div>
    }

    function renderDropdown() {
        return (
            <details className="dropdown" ref={optionDropdown} onClick={stopPropagation}>
                <summary className="invisible h-0" />
                <ul className="p-2 menu dropdown-content z-[1] bg-base-100 w-full rounded-none border border-gray-400 border-solid shadow-md " >
                    {renderDropdownContent()}
                </ul>
            </details>
        )
    }

    function renderDropdownContent() {
        return (
            <>
                {renderSearchInput()}
                {options.map(renderOption)}
            </>
        )
    }

    function renderSearchInput() {
        return (
            <div className="flex">
                <input className={`input input-bordered w-[100%] input-sm `} ref={optionSearchInput} />
                <button className="btn btn-secondary btn-outline ms-2 btn-sm"><PlusCircleIcon className="h-6 w-6 " /></button>
            </div>
        )
    }

    function renderOption({ value, label }: any) {
        return (
            <label className="label cursor-pointer justify-start hover:bg-gray-100 duration-150 select-option" key={value}>
                <input type="checkbox" value={value} className="checkbox checkbox-primary" onChange={onCheckboxChange} />
                <span className="ms-2 label-text">{label}</span>
            </label>
        )
    }

}