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
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    alert(JSON.stringify(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='px-24'>
        <MyInput
          label="Login"
          placeholder="Podaj login"
          inputParams={{...register("name", { required: true })}} />
        <MyInput
          label="Hasło"
          placeholder="Podaj hasło"
          type="password"
          inputParams={{...register("password", { required: true })}} />

        <div className='grid justify-center mt-6'>
          <button type="submit" className="btn btn-primary mb-3 btn-wide">Zaloguj</button>
          <button className="btn btn-secondary btn-outline  mb-3 btn-wide">Zarejestruj</button>
        </div >

      </div>
    </form>
  )
}

export default Login