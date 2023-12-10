"use client"
import { useForm } from 'react-hook-form';
import { isFieldValid } from '@/utils/client/FormUtils';
import { AlertType } from '@/enums/AlertType';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { loginRequest } from '@/utils/client/ApiUtils';
import MyInput from '@/components/common/form/MyInput';

function AnswerForm({ dictionary }: { dictionary: any }) {
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<LoginForm>({ mode: 'onBlur' });

    const onSubmit = async (data: LoginForm, e: any) => {
        try {
            const response = await loginRequest(data);

        } catch (errorResponse: any) {

        }
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>


            <MyInput
                label={dictionary.common.answer}
                placeholder={dictionary.common.fillAnswer}
                inputParams={{ ...register("name", { required: true }) }}
                isValid={isValid("name")} />



        </form>
    )
}

export default AnswerForm