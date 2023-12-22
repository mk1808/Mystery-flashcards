"use client"
import Title from '@/components/common/Title'
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import { isFieldValid } from "@/utils/client/FormUtils";
import useAlertStore from '@/stores/useAlertStore';
import MyInput from '@/components/common/form/MyInput';
import MyMultiSelect from '@/components/common/form/MyMultiSelect';
import useAuthStore from '@/stores/useAuthStore';
import { useSearchParams } from 'next/navigation';

function FlashcardSetsFilters({
    dictionary,
    search
}: {
    dictionary: any,
    search: (data: FlashcardSearchDto) => any
}) {
    const [statusFieldRefresh, setStatusFieldRefresh] = useState(0);
    const searchParams = useSearchParams()
    const addAlert = useAlertStore((state) => state.add);
    const currentUser = useAuthStore(state => state.currentUser);
    const langOptions = [{ value: "eng", label: "angielski" }, { value: "ge", label: "niemiecki" }]
    const hashtagsOptions = [{ value: "animals", label: "zwierzęta" }, { value: "basic", label: "podstawy" }]
    const statusesOptions = [{ value: "mine", label: "Utworzone przeze mnie" }, { value: "favorite", label: "Ulubione" }, { value: "wanting", label: "Chcę się uczyć" }, { value: "learning", label: "Uczę się" }, { value: "test", label: "Wykonywany test" }]
    const levelOptions = [{ value: "A1", label: "A1" }, { value: "A2", label: "A2" }]
    const mySetParam = searchParams.get("mySet");
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset,
        control,
        setValue
    } = useForm<FlashcardSearchDto>({ mode: 'onBlur' });

    useEffect(() => {
        if (mySetParam === "true") {
            setValue("status", ["mine"])
            setStatusFieldRefresh(setStatusFieldRefresh => setStatusFieldRefresh + 1)
        }
    }, [mySetParam])

    const onSubmit = async (data: FlashcardSearchDto, e: any) => {
        search(data);
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);

    return (
        <div className='mt-20'>
            <div className="my-6">
                <Title text={dictionary.common.whatLanguage} />
            </div>

            <div className="card w-[1100px] bg-base-100 shadow-xl">
                {renderCardBody()}
            </div>
        </div>
    )

    function renderCardBody() {
        return (
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                <div className="card-body">
                    <div className="flex justify-between">
                        {renderInput("name", dictionary.common.basicName, dictionary.common.fillBasicName)}
                        {renderSelect("lang1", dictionary.common.lang1, dictionary.common.fillLang1, langOptions)}
                        {renderSelect("lang2", dictionary.common.lang2, dictionary.common.fillLang2, langOptions)}
                    </div>
                    <div className="flex justify-between ">
                        {renderSelect("level", dictionary.common.level, dictionary.common.fillLevel, levelOptions)}
                        {renderSelect("hashtags", dictionary.common.hashtags, dictionary.common.fillHashtags, hashtagsOptions, true)}
                        {renderStatusOrSubmitButton()}
                    </div>
                    {renderSubmitButtonRowIfNeeded()}
                </div>
            </form>
        )
    }

    function renderSelect(name: any, label: string, noValueLabel: string, options: any[], multiple = false, refresh?: number) {
        return (
            <div className=' w-1/3 mx-2'>
                <MyMultiSelect
                    multiple={multiple}
                    label={label}
                    options={options}
                    noValueLabel={noValueLabel}
                    control={control}
                    isValid={isValid(name)}
                    name={name}
                    refresh={refresh} />
            </div>
        )
    }

    function renderInput(name: any, label: string, placeholder: string) {
        return (
            <div className=' w-1/3 mx-2'>
                <MyInput
                    label={label}
                    placeholder={placeholder}
                    inputParams={{ ...register(name) }} />
            </div >
        )
    }

    function renderStatusOrSubmitButton() {
        if (currentUser != null) {
            return renderSelect("status", dictionary.common.status, dictionary.common.fillStatus, statusesOptions, true, statusFieldRefresh);
        }
        return (
            <div className="w-1/3 mx-2 flex justify-center items-center">
                {renderSubmitButton()}
            </div>
        )
    }

    function renderSubmitButton() {
        return (
            <button type="submit" className="btn btn-primary">{dictionary.common.search}
                <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
        )
    }

    function renderSubmitButtonRowIfNeeded() {
        if (currentUser == null) {
            return <></>
        }
        return (
            <div className="flex justify-center mt-6">
                {renderSubmitButton()}
            </div>
        )
    }
}

export default FlashcardSetsFilters