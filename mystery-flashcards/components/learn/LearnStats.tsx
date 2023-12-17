import React from 'react'
import StatisticsIcon from '../common/StatisticsIcon'
import SingleSidebarStat from '../common/SingleSidebarStat'

function LearnStats({ stats }: { stats: any }) {
    return (
        <>
            <StatisticsIcon />
            {stats.map((singleStat: any) => <SingleSidebarStat key={singleStat.text} title={singleStat.text} value={singleStat.value} />)}
        </>
    )
}

export default LearnStats