import useLocaleStore from '@/stores/useLocaleStore';
import React from 'react'

function ResultStatsTitle({ name, resultsTypeText }: { name: string | undefined, resultsTypeText: string }) {
    const { dictionary } = useLocaleStore(state => state);
    return (
        <h1 className="text-3xl text-center mt-3 mb-8">{resultsTypeText} <br />
            {dictionary.common.collection}:&nbsp;
            <span className='font-medium'>{name}</span>
        </h1>
    )
}

export default ResultStatsTitle