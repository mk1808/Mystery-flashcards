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

import { useForm } from 'react-hook-form';
import MyToggle from '@/components/common/form/MyToggle'
import useAlertStore from '@/stores/useAlertStore'
import { AlertType } from '@/enums/AlertType'

function Playground({ params }: { params: { locale: string } }) {
    const {
        register,
        handleSubmit,
        watch,
        formState
    } = useForm<any>({ mode: 'onBlur' });
    const addAlert = useAlertStore((state) => state.add)

    const onSubmit = (data: any, e: any) => {
        e.preventDefault()
        console.log("subm")
        console.log(event)
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => {
        console.log(formState.errors.root)
        return true;
    };
    const selectOptions = [{ value: "eng", label: "angielski" }, { value: "ge", label: "niemiecki" }]

    function addRandomAlert() {
        switch (Math.floor(Math.random() * 4)) {
            case 0: addAlert({ title: "Random success alert!", type: AlertType.success }); break;
            case 0: addAlert({ title: "Random error alert!", type: AlertType.error }); break;
            case 0: addAlert({ title: "Random info alert!", type: AlertType.info }); break;
            default: addAlert({ title: "Random warning alert!", type: AlertType.warning });
        }
    }

    return (
        <div>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <div className="h-96">
                    first
                </div>
                <RoundActionButton content={getButtonContent()} styles="border-[3px]" />
                <input type="text" placeholder="Type here" className="input input-bordered input-error w-full max-w-xs" />
                <div className="h-96" id="search-sets">
                    second
                    <button className="btn" onClick={addRandomAlert}>Button</button>
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
            
            <input className={`input input-bordered w-full input-error`}  />
            <MySelect label="Język" options={selectOptions} />
            <MyTextarea label="Opis" placeholder="Wpisz opis" />
            <MyInput label="Nazwa" placeholder="Podaj nazwę" inputParams="" />
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                <div className='px-24'>
                    <MyToggle
                        label="test toggle"
                        inputParams={{ ...register("toggle1", { required: true }) }}
                        isValid={isValid("toggle1")}
                    />
                    <MyInput
                        label="Login"
                        placeholder="Podaj login"
                        inputParams={{ ...register("name", { required: true }) }}
                        isValid={isValid("name")} />
                    <MyInput
                        label="Hasło"
                        placeholder="Podaj hasło"
                        type="password"
                        inputParams={{ ...register("password", { required: true }) }}
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