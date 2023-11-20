import React from 'react'

export default function FlashcardsDetails({ params }: { params: { id: String } }) {
  return (
    <div>FlashcardsDetails {params.id}</div>
  )
}
