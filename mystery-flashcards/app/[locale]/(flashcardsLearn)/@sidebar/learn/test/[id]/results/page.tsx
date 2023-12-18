import LearnStats from '@/components/learn/LearnStats';
import { fetchDictionary } from '@/dictionaries/dictionaries';
import { FlashCardSetDto } from '@/dtos/FlashCardSetDto';
import { UserT } from '@/models/User';
import { getFlashcardSetRequest, getWhoAmi } from '@/utils/client/ApiUtils';
import { findNextRang, getRang } from '@/utils/server/userRangUtils';
import { cookies } from 'next/headers';
import React, { use } from 'react'

export default async function LearnTestResultsSidebar({ params }: { params: { id: string, locale: string } }) {
  const tempId = "656b7e961c783fdd82116774";
  const dictionary = await fetchDictionary(params.locale);
  const headers = {
    cookie: 'token=' + cookies().get('token')?.value
  }

  const flashcardSetDto: FlashCardSetDto = await getFlashcardSetRequest(tempId/*params.id*/, headers);
  const user: UserT = await getWhoAmi(headers);

  const statsValues = [
    {
      text: "Liczba odpowiedzi",
      value: flashcardSetDto.testResult?.allCount
    }, {
      text: "Liczba poprawnych odpowiedzi",
      value: flashcardSetDto.testResult?.validCount
    }, {
      text: "Poprawnych odpowiedzi",
      value: flashcardSetDto.testResult?.resultPercent + "%"
    }
  ]

  return (
    <div>
      {renderTitle()}
      <div className="divider"></div>
      <h1 className="text-3xl text-center mt-3 mb-8">Wyniki nauki <br /> Kolekcja: {flashcardSetDto.flashcardSet?.name}</h1>

      <LearnStats stats={statsValues} />
      <br />
    </div>
  )

  function renderTitle() {
    const gainPoints = flashcardSetDto.testResult?.validCount! * 10;
    const range = getRang(user.rang!)
    const toNextLevel = findNextRang(user.rang!).pointsFrom - user.points;
    return (
      <>
        <h1 className="text-4xl text-center mt-3 mb-8">Gratulacje! Zdobyłeś {gainPoints} pkt!</h1>
        <h1 className="text-2xl text-center mt-3 mb-8">Twój obecny poziom to {range?.name}. <br /> Do kolejnego poziomu brakuje {toNextLevel} pkt</h1>
      </>
    )
  }
}
