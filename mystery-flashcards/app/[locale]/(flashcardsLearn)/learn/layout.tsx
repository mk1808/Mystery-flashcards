import Card from '@/components/Card'
import LearnSubmitButtons from '@/components/learn/LearnSubmitButtons'
import LearnTitle from '@/components/learn/LearnTitle'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function LearnLayout({ children, params }: { children: any, params: any }) {
    const dictionary = await fetchDictionary(params.locale);
    return (
        <div className='grid items-start'>
            <Card title={<LearnTitle dictionary={dictionary} />} className='h-[60vh] w-[1000px] mb-8'>
                {children}
            </Card>
            <div className='grid justify-center'>
                <LearnSubmitButtons dictionary={dictionary}/>
            </div >
        </div>
    )
}

export default LearnLayout