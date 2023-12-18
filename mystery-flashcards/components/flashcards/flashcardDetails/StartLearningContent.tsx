import { isFieldValid } from '@/utils/client/FormUtils';
import React from 'react'

function StartLearningContent({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    function handleSubmit(onSubmit: any, onErrors: any) {

    }

    const onSubmit = async (data: NewFlashcardSetForm, e: any) => {
        // const response = await login(data);
        // reset();
        // router.push('/user')
        console.log(data);
    };
    const onErrors = (errors: any) => console.error(errors);
    const isValid = (name: string) => true;//isFieldValid(name, formState, getFieldState);

    return (
        <div className='my-3'>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                <div className="join">
                    <input className="join-item btn" type="radio" name="options" aria-label="Radio 1" />
                    <input className="join-item btn" type="radio" name="options" aria-label="Radio 2" />

                </div>
            </form>
        </div>
    )
}

export default StartLearningContent