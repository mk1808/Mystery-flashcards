import Card from '@/components/Card'
import UserEdit from '@/components/user/UserEdit'
import UserHeader from '@/components/user/UserHeader'
import UserStatistics from '@/components/user/UserStatistics'
import React from 'react'

export default async function UserDetails() {
  return (
    <div className='w-full lg:w-fit px-5'>
      <Card title={<UserHeader />} className='h-fit w-full lg:w-[1000px] px-[5%] lg:px-[100px]'>
        <UserStatistics />
        <UserEdit  />
      </Card>
    </div>
  )
}
