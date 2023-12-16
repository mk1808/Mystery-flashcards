import { fetchDictionary } from "@/dictionaries/dictionaries";
import { FlashcardSetT } from "@/models/FlashcardSet";
import { getFlashcardSetRequest } from "@/utils/client/ApiUtils";
import { createCookieHeader } from "@/utils/client/RestUtils";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import React from 'react'

export default async function FlashcardsDetailsSidebar({ params }: { params: { locale: string, id: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const flashcardSetId = params.id;
  const { flashcardSet }: { flashcardSet: FlashcardSetT } = await getFlashcardSetRequest(flashcardSetId, createCookieHeader(cookies()));

  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet.name}</h1>
      <div className="flex">
        {renderHashtags()}
      </div>
      <div className="divider" />
      {renderMainInfo()}
      <div className="divider" />
      {renderCreationInfo()}
      <br />
    </div>
  )

  function renderHashtags() {
    return flashcardSet.hashtags?.map(renderHashtag)
  }

  function renderHashtag(hashtag: string) {
    return <div key={hashtag} className="badge badge-secondary badge-outline mr-2">{hashtag}</div>
  }

  function renderMainInfo() {
    return (
      <>
        {renderSingleInfo(dictionary.common.flashcardsCount, flashcardSet.flashcards?.length.toString()!)}
        {renderSingleInfo(dictionary.common.languages, `${flashcardSet.lang1} -> ${flashcardSet.lang2}`)}
        {renderSingleInfo(dictionary.common.level, flashcardSet.level!)}
      </>
    )
  }

  function renderCreationInfo() {
    return (
      <>
        {renderSingleInfo(dictionary.common.author, flashcardSet.user?.name!)}
        {renderSingleInfo(dictionary.common.creationDate, new Date(flashcardSet.creationDate!).toLocaleString())}
        {renderSingleInfo(dictionary.common.popularity, "100")}
      </>
    )
  }

  function renderSingleInfo(title: string, value: string) {
    return (
      <div className="my-3 flex items-center">
        <ChevronDoubleRightIcon className="h-5 w-5 mr-2 text-gray-500" />

        <span className="text-xl">{title}</span>
        <span className="text-xl">: &nbsp;</span>

        <span className="text-xl">{value}</span>
      </div>
    )
  }
}
