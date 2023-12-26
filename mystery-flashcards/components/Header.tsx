"use client"

import Link from 'next/link'
import React, { useRef } from 'react'
import useLoggedUserForLayout from '@/hooks/useLoggedUserForLayout';
import useWatchUserAuthentication from '@/hooks/useWatchUserAuthentication';
import { Bars3Icon } from "@heroicons/react/24/outline";
import useLocaleStore from '@/stores/useLocaleStore';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';

function Header() {
    const { dictionary, locale } = useLocaleStore(state => state);
    const detailsElement = useRef<any>(null);
    const { renderMenuElementIfNeeded, onLogout } = useLoggedUserForLayout({ renderMenuElement });
    useWatchUserAuthentication();

    const mainMenuElements = [
        {
            name: "common.mainPage",
            link: `/${locale}`,
            forAll: true
        },
        {
            name: "common.searchSets",
            link: `/${locale}#flashcardSetsSearch`,
            forAll: true
        },
        {
            name: "common.addNewSet",
            link: `/${locale}/flashcards/new`,
            forLogged: true
        },
        {
            name: "common.mySets",
            link: `/${locale}?mySet=true#flashcardSetsSearch`,
            forLogged: true
        },
    ]

    const nestedMenuElements = [
        {
            name: "common.login",
            link: `/${locale}/login`,
            forNotLogged: true
        },
        {
            name: "common.register",
            link: `/${locale}/register`,
            forNotLogged: true
        },
        {
            name: "common.accountDetails",
            link: `/${locale}/user`,
            forLogged: true
        },
        {
            name: "common.logout",
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
            {renderWideMenu()}
            {renderNarrowMenu()}
        </div>
    )

    function renderWideMenu() {
        return (
            <div className="navbar bg-base-100 rounded-lg hidden lg:flex">
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
        )
    }

    function renderNarrowMenu() {
        return (
            <div tabIndex={0} className="collapse bg-base-100 lg:hidden">
                <input type="checkbox" />
                <div className="collapse-title flex justify-between pe-4">
                    {renderLogo()}
                    <div className="btn btn-outline btn-primary"><Bars3Icon className="h-6 w-6 " /></div>
                </div>
                <div className="collapse-content">
                    <ul className="menu px-1 ">
                        {mainMenuElements.map(renderMenuElementIfNeeded)}
                        <li>
                            <details ref={detailsElement}>
                                <summary>
                                    {dictionary.common.account}
                                </summary>
                                <ul className="p-1  bg-base-100 rounded-t-none z-20 right-0 border-t">
                                    {nestedMenuElements.map(renderMenuElementIfNeeded)}
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    function renderLogo() {
        return (
            <Link href={`/${locale}`}>
                <img src='/images/logo5.png' className='h-[60px]' />
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
        const name = getNestedFieldByPath(dictionary, element.name)
        if (element.onClick) {
            return <span onClick={element.onClick}>{name}</span>;
        }
        return <Link href={element.link} onClick={() => console.log("test")}>{name}</Link>;
    }

}

export default Header