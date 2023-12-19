"use client"
import React from 'react'

function StartLearningActions({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
  return (
    <>
      <button className="btn ml-3">{dictionary.common.close}</button>
      <button className="btn btn-primary ml-3" form="chooseLearnTypeForm" type="submit"> {dictionary.common.confirm}</button>
    </>
  )
}
export default StartLearningActions