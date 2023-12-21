"use client"
import useAuthStore from '@/stores/useAuthStore';
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React from 'react'

function EditButton({ dictionary, author }: { dictionary: any, author: any }) {
    const currentUser = useAuthStore(state => state.currentUser);
    const isCurrentUserAuthor = currentUser != null && currentUser._id === author._id;
    return isCurrentUserAuthor ? (
        <button className="btn btn-primary"> &nbsp;<PencilSquareIcon className="h-6 w-6" /> {dictionary.common.edit} </button>
    ) : <></>
}

export default EditButton