"use client"
import useAuthStore from '@/stores/useAuthStore';
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import React from 'react'

function EditButton({ dictionary, author, flashcardSetId, locale }: { dictionary: any, author: any, flashcardSetId: any, locale: string }) {
    const currentUser = useAuthStore(state => state.currentUser);
    const router = useRouter();
    const isCurrentUserAuthor = currentUser != null && currentUser._id === author._id;
    const onEdit = () => router.push(`/${locale}/flashcards/${flashcardSetId}/edit`)
    return isCurrentUserAuthor ? (
        <button className="btn btn-primary" onClick={onEdit}>
            <PencilSquareIcon className="h-6 w-6" /> {dictionary.common.edit}
        </button>
    ) : <></>
}

export default EditButton