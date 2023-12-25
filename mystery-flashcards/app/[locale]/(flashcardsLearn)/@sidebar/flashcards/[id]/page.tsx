import Badges from "@/components/common/Badges";
import SingleSidebarInfo from "@/components/common/SingleSidebarInfo";
import UserAvatar from "@/components/common/UserAvatar";
import EditButton from "@/components/flashcards/flashcardDetails/EditButton";
import GoToTestResultsButton from "@/components/flashcards/flashcardDetails/GoToTestResultsButton";
import { fetchDictionary } from "@/dictionaries/dictionaries";
import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { getFlashcardSetRequest } from "@/utils/client/ApiUtils";
import { formatDate } from "@/utils/client/MathUtils";
import { createCookieHeader } from "@/utils/client/RestUtils";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import React from 'react'

export default async function FlashcardsDetailsSidebar({ params }: { params: { locale: string, id: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  const flashcardSetId = params.id;
  const { flashcardSet, userFlashcard, testResult, statistics }: FlashCardSetDto = await getFlashcardSetRequest(flashcardSetId, createCookieHeader(cookies()));
  const date = new Date(flashcardSet?.creationDate || "");
  const shouldRenderStatus = () => userFlashcard && userFlashcard?.type != "NONE";
  const translatedType = userFlashcard?.type ? dictionary.common[userFlashcard?.type!] : "";
  const isTest = userFlashcard?.type == "TESTING";
  const popularity = statistics?.favorite! + statistics?.learning!;
  return (
    <div>
      <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet?.name}</h1>
      <Badges badges={flashcardSet?.hashtags!} />
      <div className="divider" />
      {renderMainInfo()}
      <div className="divider" />
      {renderCreationInfo()}
      {shouldRenderStatus() && <>
        <div className="divider" />
        {renderStatusInfo()}
      </>}
      <br />
      {renderEditButton()}
    </div>
  )

  function renderMainInfo() {
    return (
      <>
      <SingleSidebarInfo title={dictionary.common.flashcardsCount} value={flashcardSet?.flashcards?.length.toString()!} />
      <SingleSidebarInfo title={dictionary.common.languages} value={`${flashcardSet?.lang1} -> ${flashcardSet?.lang2}`}/>
      <SingleSidebarInfo title={dictionary.common.level} value={flashcardSet?.level!}/>
      </>
    )
  }

  function renderCreationInfo() {
    return (
      <>

      {renderSingleInfo(dictionary.common.author, flashcardSet?.user?.name!, true)} 
      <SingleSidebarInfo title={dictionary.common.creationDate} value={formatDate(date)} />
      <SingleSidebarInfo title={dictionary.common.popularity} value={popularity.toString()} />
      </>
    )
  }

  function renderStatusInfo() {
    return (
      <>
        {renderSingleInfo(dictionary.common.status, translatedType)}

        {isTest &&
          <div className="flex items-center">
            {renderSingleInfo(dictionary.common.lastTestResult, Math.round(testResult?.resultPercent!) + "%")}
            <GoToTestResultsButton dictionary={dictionary} author={flashcardSet?.user} flashcardSetId={flashcardSet?._id} locale={params.locale} />
          </div>
        }
      </>
    )
  }

  function renderSingleInfo(title: string, value: string, withPhoto?: boolean) {
    return (
      <div className="my-3 flex items-center">
        <ChevronDoubleRightIcon className="h-5 w-5 mr-2 text-gray-500" />

        <span className="text-xl">{title}</span>
        <span className="text-xl me-2">:</span>
        <span className="text-xl">{value}</span>

        {withPhoto &&
          <div className="h-[39px]">
            <UserAvatar
              alt={dictionary.common.userAvatarAlt}
              currentUser={flashcardSet?.user}
              className="ml-3 border-2 rounded-lg border-secondary"
              width={50}
              imgClassName="rounded-lg border-secondary" />
          </div>
        }
      </div>
    )
  }

  function renderEditButton() {
    return (
      <div className="flex justify-center mt-6">
        <EditButton dictionary={dictionary} author={flashcardSet?.user} flashcardSetId={flashcardSet?._id} locale={params.locale} />
      </div>
    )
  }
}
