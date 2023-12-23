"use client"
import useLoggedUserForLayout from '@/hooks/useLoggedUserForLayout';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

function Footer({ dictionary, locale }: { dictionary: any, locale: any }) {
    const newTabAttrs = { rel: "noopener noreferrer", target: "_blank" }
    const year = new Date().getFullYear();
    const { renderMenuElementIfNeeded } = useLoggedUserForLayout({ renderMenuElement, locale });
    const pathname = usePathname();
    const router = useRouter();

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
            link: `/${locale}?mySet=true#flashcardSetsSearch`,
            forLogged: true
        },
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
    ]

    const languageMenuElements = [
        {
            name: dictionary.common.languagePL,
            onClick: () => changeLanguage("pl"),
            forAll: true
        },
        {
            name: dictionary.common.languageENG,
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

    const changeLanguage = (lang: any) => {
        router.push(pathname.replace(locale, lang));
    }

    return (
        <footer className="footer p-10 mt-4 bg-base-200 text-base-content grid-cols-5">
            <aside className='col-span-3 md:col-span-2'>
                <Link href="/" className='mb-2'>
                    <img src='/images/logo2.png' className='h-[100px]' />
                </Link>
                <p>Copyright © {year} Monika Kordoń, Marek Czopor</p>
            </aside>

            <div className="col-span-2 md:col-span-3 md:grid-cols-3 h-full w-full">
                <nav className="ps-3 border-s-2 border-slate-600 h-full grid" >
                    <header className="footer-title">{dictionary.common.browse}</header>
                    {mainMenuElements.map(renderMenuElementIfNeeded)}

                </nav>
                <nav className="ps-3 border-s-2 border-slate-600 h-full grid">
                    <header className="footer-title">{dictionary.common.language}</header>
                    {languageMenuElements.map(renderMenuElementIfNeeded)}
                    {renderEmpty()}
                    {renderEmpty()}
                </nav>
                <nav className="ps-3 border-s-2 border-slate-600 h-full grid">
                    <header className="footer-title">{dictionary.common.contact}</header>
                    {contactMenuElements.map(renderMenuElementIfNeeded)}
                    {renderEmpty()}
                    {renderEmpty()}
                </nav>
            </div>
        </footer>
    )

    function renderEmpty() {
        return <a className='min-h-[1.25rem]'></a>;
    }

    function renderMenuElement(element: any) {
        if (element.onClick) {
            return <a className="link link-hover min-h-[1.25rem]" key={element.name} onClick={element.onClick}>{element.name}</a>
        }
        return <Link href={element.link} {...(element.newTab ? newTabAttrs : {})} key={element.name}>{element.name}</Link>;
    }
}

export default Footer