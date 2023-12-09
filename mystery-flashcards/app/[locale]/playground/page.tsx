"use client"
import RoundActionButton from '@/components/common/RoundActionButton'
import React from 'react'
import { ArrowLongDownIcon } from '@heroicons/react/24/solid'
import Steps from '@/components/common/Steps'
import Card from '@/components/Card'
import Modal from '@/components/common/Modal'
import MySelect from '@/components/common/form/MySelect'
import MyTextarea from '@/components/common/form/MyTextarea'
import MyInput from '@/components/common/form/MyInput'


//import { getDictionary } from '@/dictionaries/dictionaries';
import { use } from 'react'
import { useForm} from 'react-hook-form';

function Playground({ locale }: { locale: string }) {
     //   const dictionary = use(getDictionary(locale));
        const {
          register,
          handleSubmit,
          watch,
        //  getFieldState,
          formState
        } = useForm<LoginForm>({mode: 'onBlur'});
      
        const onSubmit = (data: LoginForm, e:any) => {
          e.preventDefault()
          console.log("subm")
          console.log(event)
        };
        const onErrors = (errors:any) => console.error(errors);
        const isValid = (name:string)=>{
         // console.log(getFieldState("name", formState));
       // const {errors} = formState;
        console.log(formState.errors.root)
           return true;};
      //  const errorClass = () => isValid ? "" : "input-error";
    const selectOptions = [{value:"eng", label:"angielski"}, {value:"ge", label:"niemiecki"}]
    return (
        <div>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <div className="h-96">
                    first
                </div>
                <RoundActionButton content={getButtonContent()} styles="border-[3px]" />
                <div className="h-96" id="search-sets">
                    second
                    <button className="btn">Button</button>
                    <button className="btn btn-neutral">Neutral</button>
                    <button className="btn btn-primary">Primary</button>
                    <button className="btn btn-secondary">Secondary</button>
                    <button className="btn btn-accent">Accent</button>
                    <button className="btn btn-ghost">Ghost</button>
                    <button className="btn btn-link">Link</button>
                    <div style={{ width: 200, height: 200 }} className="bg-primary"></div>
                </div>
            </div>
            {renderStepsCard()}
            <div className='my-5'>
                {renderCard()}
            </div>
            <MySelect label="Język" options={selectOptions}/>
            <MyTextarea label="Opis" placeholder="Wpisz opis"/>
            <MyInput label="Nazwa" placeholder="Podaj nazwę" inputParams=""/>
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
        </div>
    )

    function getButtonContent() {
        return <ArrowLongDownIcon className="h-11 w-11" />
    }

    function renderStepsCard() {
        return <Modal modalTrigger={<button className="btn">open modal</button>}
            dialogHeader={<h3 className="font-bold text-lg">Hello!</h3>}
            dialogActions={<button className="btn">Close</button>}
            dialogContent={<Steps steps={[{ title: 1 }, { title: 2 }, { title: 3 }]} />}
        />
    }

    function renderCard() {
        return (
            <>
                <div className='w-3 h-3 bg-black'>abc</div>
                <div className="card w-[1000px] bg-base-100 shadow-xl mb-10">
                    <div className="card-body">
                        <div className="flex justify-around">
                            <div className="w-full flex justify-end">
                                text
                            </div>
                            <div className="divider divider-horizontal"></div>
                            <div className="w-full">
                                text
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Playground