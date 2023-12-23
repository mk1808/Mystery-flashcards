import { getNestedFieldByPath } from "../server/objectUtils";

export function translateOptions(options: Option[], dictionary: any): Option[] {
    return options.map(option => ({ value: option.value, label: getNestedFieldByPath(dictionary, option.label) }))
}