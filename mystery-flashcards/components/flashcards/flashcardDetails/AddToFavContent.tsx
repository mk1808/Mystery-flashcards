import useLocaleStore from '@/stores/useLocaleStore';
import React from 'react'

function AddToFavContent({ flashcardSet }: { flashcardSet: any }) {
  const { dictionary } = useLocaleStore(state => state);
  return (
    <div className='my-3'>{dictionary.common.doAddCollectionTo}
      <span className='font-medium text-primary text-lg'> {flashcardSet.name} </span>
      {dictionary.common.toList}
      <span className='font-medium text-primary text-lg'> {dictionary.common.favoriteCollection}</span>?
    </div>
  )
}

export default AddToFavContent