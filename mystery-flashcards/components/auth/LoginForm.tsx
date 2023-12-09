"use client"
import { useForm } from 'react-hook-form';
import MyInput from '../common/form/MyInput';
import { isFieldValid } from '@/utils/client/FormUtils';

export default function LoginForm({ dictionary }: { dictionary: any }) {
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState
    } = useForm<LoginForm>({ mode: 'onBlur' });

    const onSubmit = (data: LoginForm, e: any) => {
        console.log(data);
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div className='px-24'>

                <MyInput
                    label="Login"
                    placeholder="Podaj login"
                    inputParams={{ ...register("name", { required: true }) }}
                    isValid={isValid("name")} />
                <MyInput
                    label="Hasło"
                    placeholder="Podaj hasło"
                    type="password"
                    inputParams={{ ...register("password", { required: true }) }}
                    isValid={isValid("password")} />

                <div className='grid justify-center mt-6'>
                    <button type="submit" className="btn btn-primary mb-3 btn-wide">Zaloguj</button>
                    <button className="btn btn-secondary btn-outline mb-3 btn-wide">Zarejestruj</button>
                </div>
            </div>
        </form>
    )
}