"use client"
import { isFieldValid } from '@/utils/client/FormUtils';
import React, { useEffect, useMemo, useRef } from 'react'
import MyInput from '../common/form/MyInput';
import { useForm } from 'react-hook-form';
import MyToggle from '../common/form/MyToggle';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import { FlashcardSetT } from '@/models/FlashcardSet';
import MyMultiSelect from '../common/form/MyMultiSelect';
import { LangOptions } from '@/enums/LangOptions';
import { translateOptions } from '@/utils/client/EnumUtils';
import { LevelOptions } from '@/enums/LevelOptions';
import useHashtags from '@/hooks/useHashtags';
import useLocaleStore from '@/stores/useLocaleStore';

function NewFlashcardForm({
    flashcardSet
}: {
    flashcardSet?: FlashcardSetT
}) {
    const { dictionary } = useLocaleStore(state => state);
    const langOptions = useMemo(() => translateOptions(LangOptions, dictionary), [])
    const levelOptions = useMemo(() => translateOptions(LevelOptions, dictionary), [])
    const hashtagsOptions = useHashtags();
    const { updateSidebarForm, setSidebarFormValid, initState, resetState } = useNewFlashcardSetStore((state) => state);
    const initOnceRef = useRef(false)
    const validateLang2 = (lang2: string) => watch("lang1") !== lang2 || dictionary.common.languagesShouldDiffer;
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset,
        control
    } = useForm<NewFlashcardSetForm>({ mode: 'onBlur', defaultValues: getDefaultValues() });

    useEffect(() => {
        const subscription = watch((value) => { updateSidebarForm({ ...value }) })
        return () => subscription.unsubscribe()
    }, [watch])

    useEffect(() => {
        setSidebarFormValid(formState.isValid || !!flashcardSet)
    }, [formState])

    useEffect(() => {
        if (!flashcardSet) {
            resetState();
        }
    }, [])

    useEffect(() => {
        if (flashcardSet && !initOnceRef.current) {
            initState(flashcardSet);
            initOnceRef.current = true;
        }
    }, [flashcardSet])

    const onSubmit = async (data: NewFlashcardSetForm, e: any) => {
        // const response = await login(data);
        // reset();
        // router.push('/user')
        console.log(data);
    };
    const onErrors = (errors: any) => { };
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);


    function getDefaultValues(): any {
        if (flashcardSet) {
            return {
                name: flashcardSet.name,
                lang1: flashcardSet.lang1,
                lang2: flashcardSet.lang2,
                level: flashcardSet.level,
                hashtags: flashcardSet.hashtags,
                isPublic: flashcardSet.isPublic,
            }
        }
        return {}
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)} id='sidebarForm'>
            <div>
                <MyInput
                    label={dictionary.common.basicName}
                    placeholder={dictionary.common.fillBasicName}
                    inputParams={{ ...register("name", { required: true }) }}
                    isValid={isValid("name")} />
                <MyMultiSelect
                    label={dictionary.common.lang1}
                    control={control}
                    required={true}
                    name='lang1'
                    options={langOptions}
                    noValueLabel={dictionary.common.fillLang1}
                    isValid={isValid("lang1")} />
                <MyMultiSelect
                    label={dictionary.common.lang2}
                    control={control}
                    required={true}
                    name='lang2'
                    options={langOptions}
                    noValueLabel={dictionary.common.fillLang2}
                    isValid={isValid("lang2")}
                    validate={validateLang2}
                />
                <MyMultiSelect
                    label={dictionary.common.level}
                    control={control}
                    required={true}
                    name='level'
                    options={levelOptions}
                    noValueLabel={dictionary.common.fillLevel}
                    isValid={isValid("level")} />
                <MyMultiSelect
                    label={dictionary.common.hashtags}
                    control={control}
                    required={true}
                    multiple={true}
                    allowNew={true}
                    name='hashtags'
                    options={hashtagsOptions}
                    noValueLabel={dictionary.common.fillHashtags}
                    isValid={isValid("hashtags")}
                    className='mb-3' />
                <MyToggle
                    label={dictionary.common.public}
                    inputParams={{ ...register("isPublic") }}
                    isValid={isValid("isPublic")}
                />
            </div>
        </form>
    )
}

export default NewFlashcardForm