
import LoginForm from '@/components/auth/LoginForm';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function Login({ params }: { params: { locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
 
  return <LoginForm dictionary={dictionary} />
}

export default Login