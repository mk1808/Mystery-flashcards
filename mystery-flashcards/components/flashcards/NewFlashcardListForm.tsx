"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import FlashcardContainer from '../common/FlashcardContainer'
import { useRouter } from 'next/navigation';
import { isFieldValid } from '@/utils/client/FormUtils';
import MyInput from '../common/form/MyInput';
import MyTextarea from '../common/form/MyTextarea';
import useNewFlashcardSetStore from '@/stores/useNewFlashcardSetStore';
import Flashcard from '@/models/Flashcard';

function NewFlashcardListForm({ dictionary, flashcards }: { dictionary: any, flashcards: any }) {
    const router = useRouter();
    /*const {
        register,
        handleSubmit,
        watch,
        getFieldState,
        formState,
        reset
    } = useForm<any>({ mode: 'onBlur' });
    const onSubmit = async (data: LoginForm, e: any) => {
        //const response = await login(data);
        reset();
        router.push('/user')
        console.log(data);
        //console.log(response);
    };*/
    //const watchAllFields = watch();
    //const onErrors = (errors: any) => console.error(errors);
   // const isValid = (name: string) => isFieldValid(name, formState, getFieldState);
    const flashcardsList = useNewFlashcardSetStore((state) => state.flashcardsList)
    const addFlashcard = useNewFlashcardSetStore((state) => state.addFlashcard)
    const updateFlashcard = useNewFlashcardSetStore((state) => state.updateFlashcard)
   /* useEffect(() => {

        console.log(flashcardsList[flashcardsList.length - 1])
        const lastFlashcard = flashcardsList[flashcardsList.length - 1];
        const values = Object.values(lastFlashcard)
       // updateFlashcard()
        console.log(values)
        
        const anyFilled = values.slice(1,values.length).some((value:any)=>value!="")
        if(anyFilled){
            addFlashcard();
        }
    }, [watchAllFields])*/

    console.log(JSON.stringify(flashcardsList[0]))
    return (
    <>
            {flashcardsList.map((card: any) =>
                <FlashcardContainer
                    key={card._id}
                    card={card}
                    dictionary={dictionary}
                    onDelete={onDelete} />
            )}
            <button type="button" className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={addFlashcard}>zmien</button>
        </>
    )
    //{firstName}
    //      <button className="btn btn-secondary btn-outline bg-base-100 mr-10" onClick={() => updateFirstName("newV")}>zmien</button>

   

    function onDelete() {
        console.log("onDelete")
    }
}

export default NewFlashcardListForm