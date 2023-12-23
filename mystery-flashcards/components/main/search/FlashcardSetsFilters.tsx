"use client"
import Title from '@/components/common/Title'
import React, { useMemo } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import { isFieldValid } from "@/utils/client/FormUtils";
import useAlertStore from '@/stores/useAlertStore';
import MyInput from '@/components/common/form/MyInput';
import MyMultiSelect from '@/components/common/form/MyMultiSelect';
import { LangOptions } from '@/enums/LangOptions';
import { LevelOptions } from '@/enums/LevelOptions';
import { translateOptions } from '@/utils/client/EnumUtils';

function FlashcardSetsFilters({
    dictionary,
    search
}: {
    dictionary: any,
    search: (data: FlashcardSearchDto) => any
}) {
    const addAlert = useAlertStore((state) => state.add);
    const langOptions = useMemo(() => translateOptions(LangOptions, dictionary), [])
    const levelOptions = useMemo(() => translateOptions(LevelOptions, dictionary), [])
    const hashtagsOptions = [{ value: "animals", label: "zwierzęta" }, { value: "basic", label: "podstawy" }]
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset,
        control
    } = useForm<FlashcardSearchDto>({ mode: 'onBlur' });

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
                        <div className="w-1/3 mx-2 flex justify-center items-center">
                            <button type="submit" className="btn btn-primary">{dictionary.common.search}
                                <MagnifyingGlassIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    function renderSelect(name: any, label: string, noValueLabel: string, options: any[], multiple = false) {
        return (
            <div className=' w-1/3 mx-2'>
                <MyMultiSelect
                    multiple={multiple}
                    label={label}
                    options={options}
                    noValueLabel={noValueLabel}
                    control={control}
                    isValid={isValid(name)}
                    name={name} />
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
}

export default FlashcardSetsFilters