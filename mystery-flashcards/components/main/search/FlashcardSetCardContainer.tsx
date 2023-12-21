"use client"
import { FlashcardSetT } from '@/models/FlashcardSet'
import { useRouter } from 'next/navigation'
import React from 'react'

function FlashcardSetCardContainer({ children, flashcardSet }: { children: any, flashcardSet: FlashcardSetT }) {
    const router = useRouter();
    const onClick = () => router.push(`/flashcards/${flashcardSet._id}`)
    return (
        <div className="cursor-pointer hover:animate-[wiggle_3s_ease-in]" onClick={onClick}>{children}</div>
    )
}

export default FlashcardSetCardContainer