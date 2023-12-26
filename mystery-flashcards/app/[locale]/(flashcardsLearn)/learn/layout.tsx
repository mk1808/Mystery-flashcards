import Card from '@/components/Card'
import LearnSubmitButtons from '@/components/learn/LearnSubmitButtons'
import LearnTitle from '@/components/learn/LearnTitle'
import React from 'react'

async function LearnLayout({ children }: { children: any }) {
    return (
        <div >
            <Card title={<LearnTitle />} className='min-h-[60vh] mb-8 '>
                {children}
            </Card>
            <div className='grid justify-center'>
                <LearnSubmitButtons />
            </div >
        </div>
    )
}

export default LearnLayout