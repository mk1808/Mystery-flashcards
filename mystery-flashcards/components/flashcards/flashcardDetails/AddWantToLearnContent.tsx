import React from 'react'

function AddWantToLearnContent({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
  return (
    <div className='my-3'>{dictionary.common.doAddCollectionTo}
      <span className='font-medium text-primary text-lg'> {flashcardSet.name} </span>
      {dictionary.common.toList}
      <span className='font-medium text-primary text-lg'> {dictionary.common.wantToLearnList}</span>?
      &nbsp;{dictionary.common.wantToLearnInfo}
    </div>
  )
}

export default AddWantToLearnContent