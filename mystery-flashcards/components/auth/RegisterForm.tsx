"use client"
import { useForm } from 'react-hook-form';
import MyInput from '../common/form/MyInput';
import { isFieldValid } from '@/utils/client/FormUtils';
import { useRouter } from 'next/navigation';
import useAlertStore from '@/stores/useAlertStore';
import { AlertType } from '@/enums/AlertType';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { registerRequest } from '@/utils/client/ApiUtils';
import useLocaleStore from '@/stores/useLocaleStore';

export default function RegisterForm() {
    const { dictionary, locale } = useLocaleStore(state => state);
    const addAlert = useAlertStore((state) => state.add)
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<RegisterForm>({ mode: 'onBlur' });

    const goToLogin = () => router.push(`/${locale}/login`)
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const validatePassword = (confirmPassword: string) => watch("password") === confirmPassword || dictionary.common.passwordDoNotMatch;

    async function onSubmit(data: RegisterForm, e: any) {
        try {
            const response = await registerRequest(data);
            addAlert({ type: AlertType.success, title: getNestedFieldByPath(dictionary, response.message) })
            goToLogin();
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div className='px-2 sm:px-24'>

                <MyInput
                    label={dictionary.common.name}
                    placeholder={dictionary.common.fillName}
                    inputParams={{ ...register("name", { required: true, minLength: 3 }) }}
                    isValid={isValid("name")} />
                <MyInput
                    label={dictionary.common.email}
                    placeholder={dictionary.common.fillEmail}
                    type="email"
                    inputParams={{ ...register("mail", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }) }}
                    isValid={isValid("mail")} />
                <MyInput
                    label={dictionary.common.password}
                    placeholder={dictionary.common.fillPassword}
                    type="password"
                    inputParams={{ ...register("password", { required: true, minLength: 8 }) }}
                    isValid={isValid("password")} />
                <MyInput
                    label={dictionary.common.confirmPassword}
                    placeholder={dictionary.common.fillConfirmPassword}
                    type="password"
                    inputParams={{ ...register("confirmPassword", { required: true, validate: validatePassword }) }}
                    isValid={isValid("confirmPassword")} />

                <div className='grid justify-center mt-6'>
                    <button type="submit" className="btn btn-primary mb-3 btn-wide">{dictionary.common.register}</button>
                    <button type="button" className="btn btn-secondary btn-outline mb-3 btn-wide" onClick={goToLogin}>{dictionary.common.login}</button>
                </div>
            </div>
        </form>
    )
}