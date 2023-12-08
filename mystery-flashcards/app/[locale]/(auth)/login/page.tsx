"use client"
import MyInput from '@/components/common/form/MyInput';
import MySelect from '@/components/common/form/MySelect';
import { getDictionary } from '@/dictionaries/dictionaries';
import React, { use } from 'react'
import { useForm } from 'react-hook-form';

function Login({ locale }: { locale: string }) {
  const dictionary = use(getDictionary(locale));
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginForm>({mode: 'onBlur'});

  const onSubmit = (data: LoginForm) => {
    console.log(data)
  };
  const onErrors = (errors:any) => console.error(errors);
  const isValid = (name:string)=>!Object.keys(errors).includes(name);

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className='px-24'>
        <MyInput
          label="Login"
          placeholder="Podaj login"
          inputParams={{...register("name", { required: true })}}
          isValid={isValid("name")} />
        <MyInput
          label="Hasło"
          placeholder="Podaj hasło"
          type="password"
          inputParams={{...register("password", { required: true })}}
          isValid={isValid("password")} />

        <div className='grid justify-center mt-6'>
          <button type="submit" className="btn btn-primary mb-3 btn-wide">Zaloguj</button>
          <button className="btn btn-secondary btn-outline  mb-3 btn-wide">Zarejestruj</button>
        </div >
      </div>
    </form>
  )
}

export default Login