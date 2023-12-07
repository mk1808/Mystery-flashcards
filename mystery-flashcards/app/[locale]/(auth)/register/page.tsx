import { getDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function Register({ locale }: { locale: string }) {
  const dictionary = await getDictionary(locale);
  return (
    <div className='px-24'>
      {renderInput()}
      {renderInput()}
      {renderInput()}
      {renderInput()}

      <div className='grid justify-center mt-6'>
        <button className="btn btn-primary mb-3 btn-wide">Zarejestruj </button>
        <button className="btn btn-secondary btn-outline  mb-3 btn-wide">Zaloguj</button>
      </div >
    </div>
  )


  function renderInput() {
    return (
      <div className="mt-6">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
        <div className="mt-2">
          <input type="text" name="street-address" id="street-address" autoComplete="street-address"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
    )
  }

}

export default Register