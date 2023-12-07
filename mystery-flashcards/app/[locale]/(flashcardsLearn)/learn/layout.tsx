import Card from '@/components/Card'
import LearnSubmitButtons from '@/components/learn/LearnSubmitButtons'
import LearnTitle from '@/components/learn/LearnTitle'
import React from 'react'

function LearnLayout({ children }: { children: any }) {
    return (
        <div className='grid items-start'>
            <Card title={<LearnTitle></LearnTitle>} className='h-[60vh] w-[1000px] mb-8'>
                {children}
            </Card>
            <div className='grid justify-center'>
                <LearnSubmitButtons/>
            </div >

        </div>
    )
}

export default LearnLayout