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
