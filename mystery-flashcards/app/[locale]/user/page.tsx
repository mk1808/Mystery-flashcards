import Card from '@/components/Card'
import UserEdit from '@/components/user/UserEdit'
import UserHeader from '@/components/user/UserHeader'
import UserStatistics from '@/components/user/UserStatistics'
import { fetchDictionary } from '@/dictionaries/dictionaries'
import React from 'react'

export default async function UserDetails({ params }: { params: { locale: string } }) {
  const dictionary = await fetchDictionary(params.locale);
  return (
    <Card title={<UserHeader dictionary={dictionary} />} className='h-fit w-[1000px] px-[100px]'>
      <UserStatistics dictionary={dictionary} />
      <UserEdit dictionary={dictionary} />
    </Card>
  )
}
