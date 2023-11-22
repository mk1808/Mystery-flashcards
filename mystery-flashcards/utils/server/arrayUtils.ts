export const getParam:any = (params: any, values: any) => {
    return  (paramName: any) => {
        const value = params.get(paramName);
        if (value) {
            values[paramName] = value;
        }
    };
}

export const getArrParam:any = (params: any, values: any) => {
    return  (paramName: any) => {
        const value = params.getAll(paramName);
        if (value?.length>0) {
            values[paramName] = value;
        }
    };
}