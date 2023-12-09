'use client'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { use } from "react";
import Title from '../common/Title'
import { usePathname } from 'next/navigation'

function AuthTitle({dictionary}:{dictionary:any}) {
    const pathname = usePathname();
    const title = pathname.includes("login") ? dictionary.common.loginTitle : dictionary.common.registerTitle;
    return (
        <div className="flex flex-col justify-around items-center h-[140px]">
            <LockClosedIcon className="h-9 w-9 text-primary" />
            <Title text={title}></Title>
        </div>
    )
}

export default AuthTitle