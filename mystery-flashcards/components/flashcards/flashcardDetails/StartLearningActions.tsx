"use client"
import useLocaleStore from '@/stores/useLocaleStore';
import React from 'react'

function StartLearningActions() {
  const { dictionary } = useLocaleStore(state => state);
  return (
    <>
      <button className="btn ml-3">{dictionary.common.close}</button>
      <button className="btn btn-primary ml-3" form="chooseLearnTypeForm" type="submit"> {dictionary.common.confirm}</button>
    </>
  )
}
export default StartLearningActions