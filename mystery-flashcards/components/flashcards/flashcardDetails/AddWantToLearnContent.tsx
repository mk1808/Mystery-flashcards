import React from 'react'

function AddWantToLearnContent({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
    return (
        <div className='my-3'>{dictionary.common.doAddCollectionTo} {flashcardSet.name} {dictionary.common.toList} {dictionary.common.wantToLearnList}?  
        &nbsp;{dictionary.common.wantToLearnInfo}</div>
      )
}

export default AddWantToLearnContent