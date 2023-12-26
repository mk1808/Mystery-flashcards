import useLocaleStore from '@/stores/useLocaleStore';
import Link from 'next/link'
import React from 'react'

function Logo({ height = 60, className = "" }: { height?: number, className?: string }) {
    const { locale } = useLocaleStore(state => state);
    return (
        <Link href={`/${locale}`} className={className}>
            <img src='/images/logo5.png' className={`h-[${height}px]`} />
        </Link>
    )
}

export default Logo