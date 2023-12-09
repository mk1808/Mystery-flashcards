export const isFieldValid = (name: string, formState:any, getFieldState:any) => {
    //const nameField = getFieldState("name", formState);
    const { errors } = formState;
    return !Object.keys(errors).includes(name);
};

export const errorClass = (isValid:any) => isValid ? "" : "input-error";