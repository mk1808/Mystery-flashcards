export const isFieldValid = (name: string, formState: any, getFieldState: any) => {
    //const nameField = getFieldState("name", formState);
    const { errors } = formState;
    console.log("errors", name, " ", errors)
    return !Object.keys(errors).includes(name);
};

export const errorClass = (isValid: any) => isValid ? "" : "input-error";

export const errorSelectClass = (isValid: any) => isValid ? "" : "select-error";

export const errorToggleClass = (isValid: any) => isValid ? "" : "text-red-500";