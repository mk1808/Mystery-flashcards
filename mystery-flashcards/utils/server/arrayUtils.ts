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
        const value = searchParams.getAll(possibleParamName);
        if (value?.length > 0) {
            paramsValues[possibleParamName] = value;
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

export const updateElement = (array:any[],element:any) => {
    const index = array.findIndex(ae => ae._id === element._id)
    if(index >= 0){
        array[index] = element
    }
    return array;
}

export const excludeFromArray = (array: any[], element: any) => {
    const index = array.indexOf(element)
    if (index >= 0) {
        array.splice(index, 1)
    }
    return array;
}
