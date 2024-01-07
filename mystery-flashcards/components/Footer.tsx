"use client"
import useLoggedUserForLayout from '@/hooks/useLoggedUserForLayout';
import useLocaleStore from '@/stores/useLocaleStore';
import { getNestedFieldByPath } from '@/utils/server/objectUtils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import Logo from './Logo';

function Footer() {
    const { dictionary, locale } = useLocaleStore(state => state);
    const { renderMenuElementIfNeeded } = useLoggedUserForLayout({ renderMenuElement });
    const pathname = usePathname();
    const router = useRouter();

    const newTabAttrs = { rel: "noopener noreferrer", target: "_blank" }
    const year = new Date().getFullYear();

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
    ]

    const languageMenuElements = [
        {
            name: "common.languagePL",
            onClick: () => changeLanguage("pl"),
            forAll: true
        },
        {
            name: "common.languageENG",
            onClick: () => changeLanguage("en"),
            forAll: true
        },
    ]

    const contactMenuElements = [
        {
            name: "GitHub - Monika Kordoń",
            link: `https://github.com/mk1808`,
            forAll: true,
            newTab: true
        },
        {
            name: "GitHub - Marek Czopor",
            link: `https://github.com/marqos12`,
            forAll: true,
            newTab: true
        },
    ]

    const changeLanguage = (lang: string) => {
        router.push(pathname.replace(locale, lang));
    }

    return (
        <footer className="footer p-10 mt-4 bg-base-200 text-base-content grid-cols-5">
            {renderLogo()}

            <div className="col-span-5 xs:col-span-2 xl:col-span-3 xl:grid-cols-3 h-full w-full gap-4 xs:gap-0">
                {renderMenuElements(dictionary.common.browse, mainMenuElements)}
                {renderMenuElements(dictionary.common.language, languageMenuElements, [1, 2])}
                {renderMenuElements(dictionary.common.contact, contactMenuElements, [1, 2])}
            </div>
        </footer>
    )

    function renderLogo() {
        return (
            <aside className='col-span-5 xs:col-span-3 xl:col-span-2'>
                <Logo className='mb-2 ml-[-8px]' height={100} />
                <p className='text-lg'>Copyright © {year} Monika Kordoń, Marek Czopor</p>
            </aside>
        )
    }

    function renderMenuElements(headerTitle: String, elements: any[], empty: any[] = []) {
        return (
            <nav className="ps-3 border-s-2 border-slate-600 h-full grid mb-5 xs:mb-0" >
                <header className="footer-title">{headerTitle}</header>
                {elements.map(renderMenuElementIfNeeded)}
                {empty.map(renderEmpty)}
            </nav>
        )
    }

    function renderEmpty(key: any) {
        return <a className='min-h-[1.25rem]' key={key} />;
    }

    function renderMenuElement(element: any) {
        const name = getNestedFieldByPath(dictionary, element.name) || element.name
        if (element.onClick) {
            return renderClickable(element, name)
        }
        return renderLink(element, name)
    }

    function renderClickable(element: any, name: String) {
        return (
            <a className="link link-hover min-h-[1.25rem]" key={element.name} onClick={element.onClick}>{name}</a>
        )
    }

    function renderLink(element: any, name: String) {
        return (
            <Link href={element.link} {...(element.newTab ? newTabAttrs : {})} key={element.name}>{name}</Link>
        )
    }

}

export default Footer