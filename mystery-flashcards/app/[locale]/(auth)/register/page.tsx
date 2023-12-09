import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function Register({ params }: { params: { locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
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
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">What is your name?</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" />
        </label>
      </div>
    )
  }

}

export default Register