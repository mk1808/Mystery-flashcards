import Card from '@/components/Card'
import LearnSubmitButtons from '@/components/learn/LearnSubmitButtons'
import LearnTitle from '@/components/learn/LearnTitle'
import { fetchDictionary } from '@/dictionaries/dictionaries';
import React from 'react'

async function LearnLayout({ children, params }: { children: any, params: any }) {
    const dictionary = await fetchDictionary(params.locale);
    return (
        <div >
            <Card title={<LearnTitle dictionary={dictionary} />} className='min-h-[60vh] mb-8 '>
                {children}
            </Card>
            <div className='grid justify-center'>
                <LearnSubmitButtons dictionary={dictionary} locale={params.locale} />
            </div >
        </div>
    )
}

export default LearnLayout