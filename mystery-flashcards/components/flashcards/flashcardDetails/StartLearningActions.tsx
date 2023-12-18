"use client"
import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import { useRouter } from 'next/navigation';
import React from 'react'

function StartLearningActions({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
  const addAlert = useAlertStore((state) => state.add)
  const router = useRouter();
  const onSubmit = async () => {
    const body = {
      flashcardSetId: flashcardSet._id,
      type: "wantToLearn"
    }
    try {
      //  await postUserFlashcardSet(body);
      router.push(`learn/training/${flashcardSet._id}`)
      router.push(`learn/test/${flashcardSet._id}`)
    } catch (errorResponse: any) {
      addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
    }

  }
  return (
    <>
      <button className="btn ml-3">Close</button>
      <button className="btn btn-primary ml-3" onClick={onSubmit}> Confirm</button>
    </>
  )
}
export default StartLearningActions