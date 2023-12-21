"use client"

import Link from 'next/link'
import React, { useRef } from 'react'
import useLoggedUserForLayout from '@/hooks/useLoggedUserForLayout';
import useWatchUserAuthentication from '@/hooks/useWatchUserAuthentication';

function Header({
    locale,
    dictionary
}: {
    locale: string,
    dictionary: any
}) {
    const detailsElement = useRef<any>(null);
    const { renderMenuElementIfNeeded, onLogout } = useLoggedUserForLayout({ renderMenuElement });
    useWatchUserAuthentication(locale);

    const mainMenuElements = [
        {
            name: dictionary.common.mainPage,
            link: `/${locale}`,
            forAll: true
        },
        {
            name: dictionary.common.searchSets,
            link: `/${locale}#flashcardSetsSearch`,
            forAll: true
        },
        {
            name: dictionary.common.addNewSet,
            link: `/${locale}/flashcards/new`,
            forLogged: true
        },
        {
            name: dictionary.common.mySets,
            link: `/${locale}#flashcardSetsSearch`,
            forLogged: true
        },
    ]

    const nestedMenuElements = [
        {
            name: dictionary.common.login,
            link: `/${locale}/login`,
            forNotLogged: true
        },
        {
            name: dictionary.common.register,
            link: `/${locale}/register`,
            forNotLogged: true
        },
        {
            name: dictionary.common.accountDetails,
            link: `/${locale}/user`,
            forLogged: true
        },
        {
            name: dictionary.common.logout,
            onClick: onLogout,
            forLogged: true
        },
    ]

    function closeDropdown() {
        if (detailsElement?.current?.open) {
            detailsElement.current.open = false
        }
    }

    return (
        <div className="m-4">
            <div className="navbar bg-base-100 rounded-lg ">
                <div className="flex-1">
                    {renderLogo()}
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {mainMenuElements.map(renderMenuElementIfNeeded)}
                        <li>
                            <details ref={detailsElement}>
                                <summary>
                                    {dictionary.common.account}
                                </summary>
                                <ul className="p-1 w-40 bg-base-100 rounded-t-none z-20 right-0 border-t">
                                    {nestedMenuElements.map(renderMenuElementIfNeeded)}
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

    function renderLogo() {
        return (
            <Link href="/">
                <img src='/images/logo2.png' className='h-[50px]' />
            </Link>
        )
    }

    function renderMenuElement(element: any) {
        return (
            <li key={element.name} onClick={closeDropdown}>
                {renderNavElement(element)}
            </li>
        )
    }

    function renderNavElement(element: any) {
        if (element.onClick) {
            return <span onClick={element.onClick}>{element.name}</span>;
        }
        return <Link href={element.link}>{element.name}</Link>;
    }

}

export default Header