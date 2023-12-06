import Card from '@/components/Card'
import UserEdit from '@/components/user/UserEdit'
import UserHeader from '@/components/user/UserHeader'
import UserStatistics from '@/components/user/UserStatistics'
import React from 'react'

export default function UserDetails({ params }: { params: { locale: string } }) {

  return (
    <Card title={<UserHeader locale={params.locale} />} className='h-fit w-[1000px] px-[100px]'>
      <UserStatistics locale={params.locale} />
      <UserEdit locale={params.locale} />
    </Card>
  )
}
