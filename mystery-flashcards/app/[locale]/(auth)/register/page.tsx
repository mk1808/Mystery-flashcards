import { getDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function Register({ locale }: { locale: string }) {
  const dictionary = await getDictionary(locale);
  return (
    <div>
      Register
      <div className="card-actions justify-center">
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  )
}

export default Register