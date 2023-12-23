import { errorClass } from "@/utils/client/FormUtils";
import { useState, useRef, useEffect } from 'react';
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { excludeFromArray } from "@/utils/server/arrayUtils";
import { Control, useController } from "react-hook-form";
import Badges from "../Badges";


export default function MyMultiSelect({
    label,
    noValueLabel = "",
    options,
    className = "",
    isValid = true,
    control,
    name,
    required = false,
    disabled = false,
    multiple = false,
    allowNew = false,
    validate,
    refresh
}: {
    label: string,
    noValueLabel?: string,
    options: Option[],
    className?: string,
    isValid?: boolean,
    control: any,
    name: string,
    required?: boolean,
    disabled?: boolean,
    multiple?: boolean,
    allowNew?: boolean,
    validate?: any,
    refresh?: number
}) {
    const {
        field
    } = useController({
        name,
        control,
        rules: { required, validate: validate },
    });

    const [selected, setSelected] = useState<any[]>([])
    const [searchTextValue, setSearchTextValue] = useState<string>("")

    const optionDropdown = useRef<any>(null);
    const optionSearchInput = useRef<any>(null);
    const inputContainer = useRef<any>(null);
    const toggleDropdownOpenRef = useRef(toggleDropdownOpen);

    const stopPropagation = (event: any) => event.stopPropagation()
    const onSelect = (option: any) => setSelected(selected => [...selected, option]);
    const onDeselect = (option: any) => setSelected(selected => excludeFromArray([...selected], option, "value"));
    const onSearchTextChange = (event: any) => setSearchTextValue(event.target.value);
    const showOption = (optionLabel: any) => optionLabel.toLowerCase().includes(searchTextValue.trim().toLowerCase());
    const getVisibleClass = (show: boolean) => show ? "visible" : "hidden";
    const focusSearchInput = () => optionSearchInput.current.focus();
    const getDisabled = () => ({ disabled });

    useEffect(() => {
        if (multiple) {
            field.onChange(selected.map(option => option.value));
        } else {
            field.onChange(selected.length > 0 ? selected[0].value : null);
        }
    }, [selected])

    useEffect(() => {
        setDefaultValue();
    }, [refresh])

    function setDefaultValue() {
        const selectedOptions = options.filter(option => option.value === field?.value || field?.value?.indexOf(option.value) >= 0);
        setSelected(selectedOptions);
        setTimeout(() => selectedOptions.forEach(option => changeOptionCheckboxState(option.value, true)));
    }

    function toggleDropdownOpen(event: any) {
        if (disabled) {
            return;
        }
        if (event) {
            stopPropagation(event);
        }
        if (optionDropdown.current) {
            optionDropdown.current.open = !optionDropdown.current.open;
        }
        focusSearchInput();
        setTimeout(toggleCloseDropdownEventListener);
        resetSearchText();
        field.onBlur();
    }

    function toggleCloseDropdownEventListener() {
        if (optionDropdown.current.open) {
            window.addEventListener('click', toggleDropdownOpenRef.current)
        } else {
            window.removeEventListener('click', toggleDropdownOpenRef.current)
        }
        field.onBlur();
    }

    function onCheckboxChange(event: any) {
        const option = options.find(option => option.value === event.target.value);
        if (event.target.checked) {
            onSelect(option);
        } else {
            onDeselect(option);
        }
        focusSearchInput();
        field.onBlur();
    }

    function onClickOption(option: any) {
        if (multiple) {
            return;
        }
        setSelected([option]);
        toggleDropdownOpen(null);
        field.onBlur();
    }

    function resetSelection() {
        setSelected([]);
        toggleDropdownOpen(null);
        field.onBlur();
    };

    function onBadgeClick(event: any, optionIndex: number) {
        if (disabled) {
            return;
        }
        stopPropagation(event);
        const option = selected[optionIndex];
        onDeselect(option);
        changeOptionCheckboxState(option.value, false);
        field.onBlur();
    }

    function changeOptionCheckboxState(value: any, state: boolean) {
        const indexOfOption = options.findIndex(option => option.value === value);
        if (indexOfOption >= 0) {
            const checkboxes = optionDropdown.current.querySelectorAll(".select-option input");
            if (checkboxes.length > 0) {
                checkboxes[indexOfOption].checked = state;
            }
        }
    }

    function onAddNew() {
        const newOption = {
            label: searchTextValue,
            value: searchTextValue
        }
        if (multiple) {
            onSelect(newOption);
        } else {
            setSelected([newOption]);
        }
        resetSearchText();
    }

    function resetSearchText() {
        setSearchTextValue("");
        optionSearchInput.current.value = "";
    }

    return (
        <label className={`form-control w-full ${className}`} ref={inputContainer}>
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
            <div className={`input input-bordered w-full select h-fit p-2 ${errorClass(isValid)}`} onClick={toggleDropdownOpen} {...getDisabled()}>
                {renderNoValuePlaceholder()}
                {renderSelected()}
            </div>
        )
    }

    function renderSelected() {
        return multiple ? renderSelectedBadges() : renderSingleSelected()
    }

    function renderSelectedBadges() {
        return <Badges badges={selected.map(option => option.label)} onClick={onBadgeClick} />
    }

    function renderSingleSelected() {
        return selected.length > 0 && (
            <span>{selected[0].label}</span>
        )
    }

    function renderNoValuePlaceholder() {
        return selected.length === 0 && <span className="text-gray-400">{noValueLabel}</span>
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
                {renderEmptyOption()}
                {options.map(renderOption)}
            </>
        )
    }

    function renderSearchInput() {
        return (
            <div className="flex">
                <input className={`input input-bordered w-[100%] input-sm `} ref={optionSearchInput} onChange={onSearchTextChange} />
                {renderAddNewButton()}
            </div>
        )
    }

    function renderAddNewButton() {
        return allowNew && (
            <button type="button" className="btn btn-secondary btn-outline ms-2 btn-sm"><PlusCircleIcon className="h-6 w-6 " onClick={onAddNew} /></button>
        )
    }

    function renderEmptyOption() {
        return !multiple && (
            <span className="text-gray-500 p-2 cursor-pointer hover:bg-gray-100 duration-150" onClick={resetSelection}>{noValueLabel}</span>
        )
    }

    function renderOption(option: { value: any, label: string }) {
        const visibleClass = getVisibleClass(showOption(option.label));
        return (
            <label className={`label cursor-pointer justify-start hover:bg-gray-100 duration-150 select-option ${visibleClass}`} key={option.value} onClick={() => onClickOption(option)}>
                {renderCheckbox(option.value)}
                <span className="ms-2 label-text">{option.label}</span>
            </label>
        )
    }

    function renderCheckbox(value: any) {
        return multiple && <input type="checkbox" value={value} className="checkbox checkbox-primary" onChange={onCheckboxChange} />
    }

}