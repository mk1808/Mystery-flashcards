"use client"
import { FlashcardSetT } from '@/models/FlashcardSet'
import useLocaleStore from '@/stores/useLocaleStore';
import { useRouter } from 'next/navigation'
import React from 'react'

function FlashcardSetCardContainer({ children, flashcardSet }: { children: any, flashcardSet: FlashcardSetT }) {
    const router = useRouter();
    const { locale } = useLocaleStore(state => state);
    const onClick = () => router.push(`/${locale}/flashcards/${flashcardSet._id}`)
    return (
        <div className="cursor-pointer hover:animate-[wiggle_3s_ease-in]" onClick={onClick}>{children}</div>
    )
}

export default FlashcardSetCardContainer