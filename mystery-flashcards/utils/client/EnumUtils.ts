import { getNestedFieldByPath } from "../server/objectUtils";

export const translateOptions = (options: Option[], dictionary: Dictionary): Option[] => {
    return options.map(option => ({ value: option.value, label: getNestedFieldByPath(dictionary, option.label) }))
}

export const valueToOption = (value: string): Option => ({ value, label: value });