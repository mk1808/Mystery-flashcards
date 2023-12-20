export const getSearchParam: any = (searchParams: any, paramsValues: any) => {
    return (possibleParamName: any) => {
        const value = searchParams.get(possibleParamName);
        if (value) {
            paramsValues[possibleParamName] = value;
        }
    };
}

export const getArrParam: any = (searchParams: any, paramsValues: any) => {
    return (possibleParamName: any) => {
        const value = searchParams.getAll(possibleParamName).filter((param: any) => !!param);
        if (value?.length > 0) {
            paramsValues[possibleParamName] = { "$in": value };
        }
    };
}

export const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export const shouldArrayContain = () => {
    return !Math.round(Math.random());
}

export const updateElement = (array: any[], element: any) => {
    const index = array.findIndex(arrayElement => arrayElement._id === element._id)
    if (index >= 0) {
        array[index] = element
    }
    return array;
}

export const excludeFromArray = (array: any[], element: any, field?: any) => {
    const index = !field ? array.indexOf(element) : array.findIndex(arrayElement => arrayElement[field] === element[field])
    if (index >= 0) {
        array.splice(index, 1)
    }
    return array;
}

export const getAllIndexes = (array: any[], value: any) => {
    const indexes = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            indexes.push(i);
        }
    }
    return indexes;
}

