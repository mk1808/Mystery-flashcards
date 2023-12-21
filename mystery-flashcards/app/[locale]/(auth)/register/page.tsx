import RegisterForm from '@/components/auth/RegisterForm';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function Register({ params }: { params: { locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  return <RegisterForm dictionary={dictionary} locale={params.locale} />
}

export default Register