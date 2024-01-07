export const isFieldValid = (name: string, formState: any) => {
    const { errors } = formState;
    return !Object.keys(errors).includes(name);
};

export const errorClass = (isValid: boolean) => isValid ? "" : "input-error";

export const errorSelectClass = (isValid: boolean) => isValid ? "" : "select-error";

export const errorTextareaClass = (isValid: boolean) => isValid ? "" : "textarea-error";

export const errorToggleClass = (isValid: boolean) => isValid ? "" : "text-red-500";