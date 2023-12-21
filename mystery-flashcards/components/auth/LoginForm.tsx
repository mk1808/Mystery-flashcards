"use client"
import { useForm } from 'react-hook-form';
import MyInput from '../common/form/MyInput';
import { isFieldValid } from '@/utils/client/FormUtils';
import { useRouter } from 'next/navigation';
import useAlertStore from '@/stores/useAlertStore';
import { AlertType } from '@/enums/AlertType';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { loginRequest } from '@/utils/client/ApiUtils';
import useAuthStore from '@/stores/useAuthStore';

export default function LoginForm({ dictionary, locale }: { dictionary: any, locale: string }) {
    const router = useRouter();
    const addAlert = useAlertStore((state) => state.add)
    const checkWhoAmi = useAuthStore(state => state.checkWhoAmi);

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
            checkWhoAmi()
            addAlert({ type: AlertType.success, title: getNestedFieldByPath(dictionary, response.message) })
            router.push(`/${locale}/user`)
        } catch (errorResponse: any) {
            addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse?.body?.message) })
        }
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const goToRegister = () => router.push(`/${locale}/register`)

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div className='px-24'>

                <MyInput
                    label={dictionary.common.name}
                    placeholder={dictionary.common.fillName}
                    inputParams={{ ...register("name", { required: true }) }}
                    isValid={isValid("name")} />
                <MyInput
                    label={dictionary.common.password}
                    placeholder={dictionary.common.fillPassword}
                    type="password"
                    inputParams={{ ...register("password", { required: true }) }}
                    isValid={isValid("password")} />

                <div className='grid justify-center mt-6'>
                    <button type="submit" className="btn btn-primary mb-3 btn-wide">{dictionary.common.login}</button>
                    <button type="button" className="btn btn-secondary btn-outline mb-3 btn-wide" onClick={goToRegister}>{dictionary.common.register}</button>
                </div>
            </div>
        </form>
    )
}