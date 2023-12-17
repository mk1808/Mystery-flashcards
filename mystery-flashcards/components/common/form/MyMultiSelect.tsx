import { errorSelectClass } from "@/utils/client/FormUtils";
import { useState, useRef } from 'react';
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { excludeFromArray } from "@/utils/server/arrayUtils";


export default function MyMultiSelect({
    label,
    defaultValue = "",
    noValueLabel = "",
    options,
    className = "",
    isValid = true
}: {
    label: string,
    defaultValue?: string,
    noValueLabel?: string,
    options: any[],
    className?: string,
    isValid?: boolean
}) {
    const [selected, setSelected] = useState<any[]>([])
    const [searchTextValue, setSearchTextValue] = useState<string>("")

    const optionDropdown = useRef<any>(null);
    const optionSearchInput = useRef<any>(null);

    const stopPropagation = (event: any) => event.stopPropagation()
    const onSelect = (option: any) => setSelected(selected => [...selected, option]);
    const onDeselect = (option: any) => setSelected(selected => excludeFromArray([...selected], option));
    const onSearchTextChange = (event: any) => setSearchTextValue(event.target.value);
    const showOption = (optionLabel: any) => optionLabel.toLowerCase().includes(searchTextValue.trim().toLowerCase());
    const getVisibleClass = (show: boolean) => show ? "visible" : "hidden";
    const focusSearchInput = () => optionSearchInput.current.focus();

    function toggleDropdownOpen(event: any) {
        stopPropagation(event);
        if (optionDropdown.current) {
            optionDropdown.current.open = !optionDropdown.current.open
        }
        focusSearchInput()
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
        focusSearchInput()
    }

    function onBadgeClick(event: any, option: any) {
        stopPropagation(event);
        onDeselect(option);
        const indexOfOption = options.findIndex(optionElement => optionElement.value === option.value);
        if (indexOfOption >= 0) {
            optionDropdown.current.querySelectorAll(".select-option input")[indexOfOption].checked = false;
        }
    }

    function onAddNew() {
        const newOption = {
            label: searchTextValue,
            value: searchTextValue
        }
        onSelect(newOption);
        setSearchTextValue("");
        optionSearchInput.current.value = "";
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
            <div className={`input input-bordered w-full select h-fit p-2`} onClick={toggleDropdownOpen} >
                {renderSelectedBadges()}
            </div>
        )
    }

    function renderSelectedBadges() {
        return (
            <div className="flex items-center flex-wrap">
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
                <input className={`input input-bordered w-[100%] input-sm `} ref={optionSearchInput} onChange={onSearchTextChange} />
                <button className="btn btn-secondary btn-outline ms-2 btn-sm"><PlusCircleIcon className="h-6 w-6 " onClick={onAddNew} /></button>
            </div>
        )
    }

    function renderOption({ value, label }: any) {
        const visibleClass = getVisibleClass(showOption(label));
        return (
            <label className={`label cursor-pointer justify-start hover:bg-gray-100 duration-150 select-option ${visibleClass}`} key={value}>
                <input type="checkbox" value={value} className="checkbox checkbox-primary" onChange={onCheckboxChange} />
                <span className="ms-2 label-text">{label}</span>
            </label>
        )
    }

}