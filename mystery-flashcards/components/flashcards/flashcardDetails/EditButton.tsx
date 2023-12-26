"use client"
import useAuthStore from '@/stores/useAuthStore';
import useLocaleStore from '@/stores/useLocaleStore';
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import React from 'react'

function EditButton({ author, flashcardSetId }: { author: any, flashcardSetId: any }) {
    const { dictionary, locale } = useLocaleStore(state => state);
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