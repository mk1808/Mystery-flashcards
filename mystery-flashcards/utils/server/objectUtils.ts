
export function getNestedFieldByPath(object: any, fieldPath: string) {
    const pathParts = fieldPath.split(".");
    let tempObject = object;
    pathParts.forEach(part => {
        if (tempObject) {
            tempObject = tempObject[part]
        }
    })
    return tempObject;
}