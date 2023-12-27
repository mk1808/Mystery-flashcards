
export function getNestedFieldByPath(object: any, fieldPath: string) {
    if (!fieldPath) {
        return ""
    }
    const pathParts = fieldPath?.split(".");
    let tempObject = object;
    pathParts?.forEach(part => {
        if (tempObject) {
            tempObject = tempObject[part]
        } else {
            return fieldPath
        }
    })
    return tempObject;
}