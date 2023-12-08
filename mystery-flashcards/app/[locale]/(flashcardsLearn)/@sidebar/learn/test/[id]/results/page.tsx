import SingleSidebarStat from '@/components/common/SingleSidebarStat'
import StatisticsIcon from '@/components/common/StatisticsIcon'
import React from 'react'

export default function LearnTestResultsSidebar({ params }: { params: { id: String } }) {
  return (
    <div>
      {renderTitle()}
      <div className="divider"></div>
      <StatisticsIcon />
      <h1 className="text-3xl text-center mt-3 mb-8">Wyniki testu <br /> Kolekcja: Zwierzęta</h1>
      <SingleSidebarStat title="Liczba odpowiedzi" value="10" />
      <SingleSidebarStat title="Liczba poprawnych odpowiedzi" value="8" />
      <SingleSidebarStat title="% poprawnych odpowiedzi" value="80" />
      <br />
    </div>
  )

  function renderTitle() {
    return (
      <>
        <h1 className="text-4xl text-center mt-3 mb-8">Gratulacje! Zdobyłeś 20 pkt!</h1>
        <h1 className="text-2xl text-center mt-3 mb-8">Twój obecny poziom to Wilk. <br /> Do kolejnego poziomu brakuje 100pkt</h1>
      </>
    )
  }
}
