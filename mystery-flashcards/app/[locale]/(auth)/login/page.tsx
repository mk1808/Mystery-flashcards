import { getDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function Login({ locale }:  { locale: string }) {
  const dictionary = await getDictionary(locale);
  return (
    <div>
      Login
      <div className="card-actions justify-center">
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  )
}

export default Login