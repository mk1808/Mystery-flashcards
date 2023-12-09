"use client"
import { useForm } from 'react-hook-form';
import MyInput from '../common/form/MyInput';
import { isFieldValid } from '@/utils/client/FormUtils';
import useRest from '@/hooks/useRest';
import { useRouter } from 'next/navigation';

export default function LoginForm({ dictionary }: { dictionary: any }) {
    const { login } = useRest();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<LoginForm>({ mode: 'onBlur' });

    const onSubmit = async (data: LoginForm, e: any) => {
        const response = await login(data);
        reset();
        router.push('/user')        
        console.log(data);
        console.log(response);
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);

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
                    <button className="btn btn-secondary btn-outline mb-3 btn-wide">{dictionary.common.register}</button>
                </div>
            </div>
        </form>
    )
}