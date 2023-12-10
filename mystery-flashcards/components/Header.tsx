"use client"

import useAuthStore from '@/stores/useAuthStore';
import { logout } from '@/utils/client/ApiUtils';
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';

function Header({
    locale,
    dictionary
}: {
    locale: string,
    dictionary: any
}) {
    const currentUser = useAuthStore(state => state.currentUser);
    const checkWhoAmi = useAuthStore(state => state.checkWhoAmi);
    const router = useRouter();
    const detailsElement = useRef<any>(null);

    useEffect(() => {
        checkWhoAmi();
        const interval = setInterval(checkWhoAmi, 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    const mainMenuElements = [
        {
            name: dictionary.common.mainPage,
            link: `/${locale}`,
            forAll: true
        },
        {
            name: dictionary.common.searchSets,
            link: `/${locale}#search-sets`,
            forAll: true
        },
        {
            name: dictionary.common.addNewSet,
            link: `/${locale}/flashcards/new`,
            forLogged: true
        },
        {
            name: dictionary.common.mySets,
            link: `/${locale}#search-sets`,
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

    function onLogout() {
        logout().then(checkWhoAmi)
        router.push('/')
    }

    function closeDropdown() {
        if (detailsElement?.current?.open) {
            detailsElement.current.open = false
        }
    }

    return (
        <div className="m-4">
            <div className="navbar bg-base-100 rounded-lg ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">mystery flashcards</a>
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

    function renderMenuElementIfNeeded(element: any) {
        const isLogged = !!currentUser;
        if (element.forAll ||
            isLogged && element.forLogged ||
            !isLogged && element.forNotLogged)
            return renderMenuElement(element);
    }
}

export default Header