"use client"
import { isFieldValid } from '@/utils/client/FormUtils';
import { useRouter } from 'next/navigation';
import React from 'react'
import MyInput from '../common/form/MyInput';
import { useForm } from 'react-hook-form';
import MySelect from '../common/form/MySelect';
import MyToggle from '../common/form/MyToggle';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';

function NewFlashcardForm({ dictionary }: { dictionary: any }) {
    const langOptions = [{ value: "eng", label: "angielski" }, { value: "ge", label: "niemiecki" }]
    const hashtagsOptions = [{ value: "animals", label: "zwierzęta" }, { value: "basic", label: "podstawy" }]
    const levelOptions = [{ value: "A1", label: "A1" }, { value: "A2", label: "A2" }]
  //  const firstName = useNewFlashcardSetStore((state) => state.firstName)
  //  const updateFirstName = useNewFlashcardSetStore((state) => state.updateFirstName)

    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<NewFlashcardSetForm>({ mode: 'onBlur' });

    const onSubmit = async (data: NewFlashcardSetForm, e: any) => {
        // const response = await login(data);
        // reset();
        // router.push('/user')
        console.log(data);
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => isFieldValid(name, formState, getFieldState);

    return (
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <div>
                <MyInput
                    label={dictionary.common.basicName}
                    placeholder={dictionary.common.fillBasicName}
                    inputParams={{ ...register("name", { required: true }) }}
                    isValid={isValid("name")} />
                <MySelect
                    label="Język bazowy"
                    options={langOptions}
                    noValueLabel="Wybierz język"
                    inputParams={{ ...register("lang1", { required: true }) }}
                    isValid={isValid("lang1")} />
                <MySelect
                    label="Język obcy"
                    options={langOptions}
                    noValueLabel="Wybierz język"
                    inputParams={{ ...register("lang2", { required: true }) }}
                    isValid={isValid("lang2")} />
                <MySelect
                    label="Poziom"
                    options={levelOptions}
                    noValueLabel="Wybierz poziom języka"
                    inputParams={{ ...register("level", { required: true }) }}
                    isValid={isValid("level")} />
                <MySelect
                    label="Hashtagi"
                    options={hashtagsOptions}
                    noValueLabel="Wybierz hashtagi"
                    inputParams={{ ...register("hashtags") }}
                    isValid={isValid("hashtags")} />
                <MyToggle
                    label="Publiczna"
                    inputParams={{ ...register("isPublic") }}
                    isValid={isValid("isPublic")}
                />


           </div>
            <button type="submit" className="btn btn-primary my-6 btn-wide">Zatwierdź</button>

        </form>
    )
}

//{firstName}
   //   <button className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={() => updateFirstName("from sidebar")}>zmien</button>
       

export default NewFlashcardForm