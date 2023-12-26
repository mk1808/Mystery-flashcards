"use client"
import Title from '@/components/common/Title'
import React, { useEffect, useState, useMemo } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';
import { isFieldValid } from "@/utils/client/FormUtils";
import useAlertStore from '@/stores/useAlertStore';
import MyInput from '@/components/common/form/MyInput';
import MyMultiSelect from '@/components/common/form/MyMultiSelect';
import { LangOptions } from '@/enums/LangOptions';
import { LevelOptions } from '@/enums/LevelOptions';
import { translateOptions } from '@/utils/client/EnumUtils';
import useHashtags from '@/hooks/useHashtags';
import useAuthStore from '@/stores/useAuthStore';
import { useSearchParams } from 'next/navigation';
import { StatusOptions, StatusType } from '@/enums/StatusOptions';
import useLocaleStore from '@/stores/useLocaleStore';
import { FlashcardSetSearchParams as SearchParams } from '@/enums/FlashcardSetSearchParams';

function FlashcardSetsFilters({ search }: { search: (data: FlashcardSearchDto) => any }) {
    const { dictionary } = useLocaleStore(state => state);
    const currentUser = useAuthStore(state => state.currentUser);

    const [statusFieldRefresh, setStatusFieldRefresh] = useState(0);
    const searchParams = useSearchParams();
    const hashtagsOptions = useHashtags();
    const langOptions = useMemo(() => translateOptions(LangOptions, dictionary), [])
    const levelOptions = useMemo(() => translateOptions(LevelOptions, dictionary), [])
    const statusesOptions = useMemo(() => translateOptions(StatusOptions, dictionary), [])
    const mySetParam = searchParams.get("mySet");

    const {
        register,
        handleSubmit,
        getFieldState,
        formState,
        control,
        setValue
    } = useForm<FlashcardSearchDto>({ mode: 'onBlur' });

    const onSubmit = async (data: FlashcardSearchDto, e: any) => search(data);
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const refreshStatusField = () => setStatusFieldRefresh(setStatusFieldRefresh => setStatusFieldRefresh + 1);

    useEffect(onMySetParamChange, [mySetParam])

    function onMySetParamChange() {
        if (mySetParam === "true") {
            setValue(SearchParams.STATUS, [StatusType.MINE]);
            refreshStatusField();
            setTimeout(() => search({ [SearchParams.STATUS]: [StatusType.MINE] }), 100);
        }
    }

    return (
        <div className='mt-20 mx-5 md:mx-0'>
            <div className="my-6">
                <Title text={dictionary.common.whatLanguage} />
            </div>

            <div className="card w-full cards3:w-[1100px] bg-base-100 shadow-xl">
                {renderCardBody()}
            </div>
        </div>
    )

    function renderCardBody() {
        return (
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                <div className="card-body grid grid-cols-1 md:grid-cols-2 cards3:grid-cols-3">
                    {renderInput(SearchParams.NAME, dictionary.common.basicName, dictionary.common.fillBasicName)}
                    {renderSelect(SearchParams.LANG1, dictionary.common.lang1, dictionary.common.fillLang1, langOptions)}
                    {renderSelect(SearchParams.LANG2, dictionary.common.lang2, dictionary.common.fillLang2, langOptions)}

                    {renderSelect(SearchParams.LEVEL, dictionary.common.level, dictionary.common.fillLevel, levelOptions)}
                    {renderSelect(SearchParams.HASHTAGS, dictionary.common.hashtags, dictionary.common.fillHashtags, hashtagsOptions, true)}
                    {renderStatus()}
                    {renderSubmitButton()}
                </div>
            </form>
        )
    }
    function renderStatus() {
        return currentUser != null &&
            renderSelect(SearchParams.STATUS, dictionary.common.status, dictionary.common.fillStatus, statusesOptions, true, statusFieldRefresh);
    }

    function renderSelect(name: any, label: string, noValueLabel: string, options: any[], multiple = false, refresh?: number) {
        return (
            <div className='mx-2'>
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
            <div className=' mx-2'>
                <MyInput
                    label={label}
                    placeholder={placeholder}
                    inputParams={{ ...register(name) }} />
            </div >
        )
    }

    function renderSubmitButton() {
        return (
            <div className="md:col-span-2 cards3:col-span-3 flex justify-center mt-6">
                <button type="submit" className="btn btn-primary">
                    {dictionary.common.search}
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
            </div >
        )
    }
}

export default FlashcardSetsFilters