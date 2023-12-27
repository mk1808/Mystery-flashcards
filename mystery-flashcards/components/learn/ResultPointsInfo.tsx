import useLocaleStore from '@/stores/useLocaleStore';
import React from 'react'

function ResultPointsInfo({
    gainPoints,
    range,
    toNextLevel
}: {
    gainPoints: number,
    range: string,
    toNextLevel: number
}) {
    const { dictionary } = useLocaleStore(state => state);
    return (<>
        <h1 className="text-4xl text-center mt-3 mb-8">
            {dictionary.common.gainedPointsAre}
            <span className='font-semibold text-secondary'>&nbsp;{gainPoints}&nbsp;</span>
            {dictionary.common.pointsShortcut}!
        </h1>
        <h1 className="text-2xl text-left mt-3 mb-8 font-light">
            {dictionary.common.currentLevelIs}
            <span className='font-medium'>&nbsp;{range}</span>.<br />
            {dictionary.common.toNextLevel}
            <span className='font-medium'>&nbsp;{toNextLevel}&nbsp;</span>
            {dictionary.common.pointsShortcut}.
        </h1>
    </>
    )
}

export default ResultPointsInfo