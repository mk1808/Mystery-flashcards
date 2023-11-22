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
        if (value?.length>0) {
            paramsValues[possibleParamName] = value;
        }
    };
}