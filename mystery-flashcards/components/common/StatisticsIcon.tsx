import { ChartBarIcon } from '@heroicons/react/24/outline'
import React from 'react'

function StatisticsIcon() {
    return (
        <div className='flex justify-center'>
          <div className='py-[4px] px-[12px] bg-base-100 border border-base-100 rounded '>
            <ChartBarIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
      )
}

export default StatisticsIcon