"use client"
import { AlertType } from '@/enums/AlertType';
import useAlertStore from '@/stores/useAlertStore';
import { postUserFlashcardSet } from '@/utils/client/ApiUtils';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import React from 'react'

function AddWantToLearnActions({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    const addAlert = useAlertStore((state) => state.add)
    const onSubmit = async () => { document.getElementById("addWantToLearn")!.innerHTML = ""
      const body = {
        flashcardSetId: flashcardSet._id,
        type: "NONE",
        isFavorite: true
      }
      try {
       // const response = await postUserFlashcardSet(body);
       
      //  document.getElementById("addToFavTooltip")!.setAttribute("data-tip", dictionary.common.alreadyInFavorites);
        
        addAlert({ type: AlertType.success, title: dictionary.common.addToFavSuccess })
      } catch (errorResponse: any) {
        addAlert({ type: AlertType.error, title: getNestedFieldByPath(dictionary, errorResponse.body.message) })
      }
  
    }
    return (
      <>
        <button className="btn ml-3">{dictionary.common.close}</button>
        <button className="btn btn-primary ml-3" onClick={onSubmit}> {dictionary.common.confirm}</button>
      </>
    )
}

export default AddWantToLearnActions