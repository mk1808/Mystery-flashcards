"use client"
import Badges from "@/components/common/Badges";
import SingleSidebarInfo from "@/components/common/SingleSidebarInfo";
import UserAvatar from "@/components/common/UserAvatar";
import EditButton from "@/components/flashcards/flashcardDetails/EditButton";
import GoToTestResultsButton from "@/components/flashcards/flashcardDetails/GoToTestResultsButton";
import { FlashCardSetDto } from "@/dtos/FlashCardSetDto";
import { StatusType } from "@/enums/StatusOptions";
import useLocaleStore from "@/stores/useLocaleStore";
import { formatDate } from "@/utils/client/MathUtils";
import { getLangsDirection } from "@/utils/client/TrainingUtils";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import React from 'react'

export default function FlashcardsDetailsSidebar({ flashCardSetDto }: { flashCardSetDto: FlashCardSetDto }) {
    const { flashcardSet, userFlashcard, testResult, statistics } = flashCardSetDto
    const { dictionary } = useLocaleStore(state => state);
    const date = new Date(flashcardSet?.creationDate || "");
    const translatedType = userFlashcard?.type ? dictionary.common[userFlashcard?.type!] : "";
    const isTest = userFlashcard?.type == StatusType.TESTING;
    const popularity = statistics?.favorite! + statistics?.learning!;
    const shouldRenderStatus = () => userFlashcard && userFlashcard?.type != StatusType.NONE;

    return (
        <div>
            {renderTitle()}
            {renderBadges()}
            {renderMainInfo()}
            {renderCreationInfo()}
            {renderStatus()}
            {renderEditButton()}
        </div>
    )

    function renderTitle() {
        return <h1 className="text-4xl text-center mt-3 mb-8">{flashcardSet?.name}</h1>

    }

    function renderBadges() {
        return <Badges badges={flashcardSet?.hashtags!} />
    }

    function renderMainInfo() {
        return (
            <>
                <div className="divider" />
                <SingleSidebarInfo title={dictionary.common.flashcardsCount} value={flashcardSet?.flashcards?.length.toString()!} />
                <SingleSidebarInfo title={dictionary.common.languages} value={getLangsDirection(flashcardSet?.lang1, flashcardSet?.lang2)} />
                <SingleSidebarInfo title={dictionary.common.level} value={flashcardSet?.level!} />
            </>
        )
    }

    function renderCreationInfo() {
        return (
            <>
                <div className="divider" />
                {renderSingleInfo(dictionary.common.author, flashcardSet?.user?.name!, true)}
                <SingleSidebarInfo title={dictionary.common.creationDate} value={formatDate(date)} />
                <SingleSidebarInfo title={dictionary.common.popularity} value={popularity.toString()} />
            </>
        )
    }

    function renderStatus() {
        return shouldRenderStatus() && (
            <>
                <div className="divider" />
                {renderStatusInfo()}
            </>
        )
    }

    function renderStatusInfo() {
        return (
            <>
                {renderSingleInfo(dictionary.common.status, translatedType)}
                {renderTestResult()}
            </>
        )
    }

    function renderTestResult() {
        return isTest && (
            <div className="flex items-center">
                {renderSingleInfo(dictionary.common.lastTestResult, Math.round(testResult?.resultPercent!) + "%")}
                <GoToTestResultsButton flashcardSetId={flashcardSet?._id!} />
            </div>
        )
    }

    function renderSingleInfo(title: string, value: string, withPhoto?: boolean) {
        return (
            <div className="my-3 flex items-center">
                <ChevronDoubleRightIcon className="h-5 w-5 mr-2 text-gray-500" />

                <span className="text-xl">{title}</span>
                <span className="text-xl me-2">:</span>
                <span className="text-xl">{value}</span>

                {renderPhoto(withPhoto)}
            </div>
        )
    }

    function renderPhoto(withPhoto?: boolean) {
        return withPhoto && (
            <div className="h-[39px]">
                <UserAvatar
                    alt={dictionary.common.userAvatarAlt}
                    currentUser={flashcardSet?.user!}
                    className="ml-3 border-2 rounded-lg border-secondary"
                    width={50}
                    imgClassName="rounded-lg border-secondary" />
            </div>
        )
    }

    function renderEditButton() {
        return (
            <>
                <br />
                <div className="flex justify-center mt-6">
                    <EditButton author={flashcardSet?.user!} flashcardSetId={flashcardSet?._id!} />
                </div>
            </>
        )
    }
}
