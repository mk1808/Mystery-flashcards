import React from 'react'
import StatisticsIcon from '../common/StatisticsIcon'
import SingleSidebarStat from '../common/SingleSidebarStat'

function LearnStats({ stats }: { stats: { text: string, value: any }[] }) {
    return (
        <>
            <StatisticsIcon />
            {stats.map(singleStat => <SingleSidebarStat key={singleStat.text} title={singleStat.text} value={singleStat.value} />)}
        </>
    )
}

export default LearnStats