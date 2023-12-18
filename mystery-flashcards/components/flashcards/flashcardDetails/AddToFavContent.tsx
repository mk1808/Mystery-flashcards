import React from 'react'

function AddToFavContent({ dictionary, flashcardSet }: { dictionary: any, flashcardSet: any }) {
  return (
    <div className='my-3'>Czy dodać kolekcję {flashcardSet.name} do Ulubionych?</div>
  )
}

export default AddToFavContent