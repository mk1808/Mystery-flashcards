import React from 'react'

function AddToFavContent({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
  return (
    <div className='my-3'>{dictionary.common.doAddCollectionTo} {flashcardSet.name} {dictionary.common.toList} {dictionary.common.favoriteCollection}?</div>
  )
}

export default AddToFavContent