"use client"
import { useForm } from 'react-hook-form';
import MyInput from '../common/form/MyInput';
import { isFieldValid } from '@/utils/client/FormUtils';
import { useRouter } from 'next/navigation';
import { loginRequest } from '@/utils/client/ApiUtils';
import useAuthStore from '@/stores/useAuthStore';
import useLocaleStore from '@/stores/useLocaleStore';
import useAlert from '@/hooks/useAlert';

function LoginForm() {
    const { dictionary, locale } = useLocaleStore(state => state);
    const { addErrorAlert, addSuccessAlert } = useAlert()
    const checkWhoAmi = useAuthStore(state => state.checkWhoAmi);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        getFieldState,
        formState
    } = useForm<LoginForm>({ mode: 'onBlur' });

    const onSubmit = async (data: LoginForm, e: any) => {
        try {
            const response = await loginRequest(data);
            checkWhoAmi()
            addSuccessAlert(response.message)
            router.push(`/${locale}/user`)
        } catch (errorResponse: any) {
            addErrorAlert(errorResponse?.body?.message)
        }
    };

    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const goToRegister = () => router.push(`/${locale}/register`)

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div className='px-2 sm:px-24'>
                {renderInputs()}
                {renderButtons()}
            </div>
        </form>
    )

    function renderInputs() {
        return (
            <>
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
            </>
        )
    }

    function renderButtons() {
        return (
            <div className='grid justify-center mt-6'>
                <button type="submit" className="btn btn-primary mb-3 btn-wide">{dictionary.common.login}</button>
                <button type="button" className="btn btn-secondary btn-outline mb-3 btn-wide" onClick={goToRegister}>{dictionary.common.register}</button>
            </div>
        )
    }
}

export default LoginForm