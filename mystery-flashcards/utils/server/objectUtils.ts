
export function getValueByPath(object: any, path: string) {
    const pathParts = path.split(".");
    let tempObject = object;
    pathParts.forEach(part => {
        if (tempObject) {
            tempObject = tempObject[part]
        }
    })
    return tempObject;
}