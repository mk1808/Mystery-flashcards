import Link from 'next/link'
import React from 'react'

function Header({ locale }:  { locale: string }) {
    const mainMenuElements = [
        {
            name: "Strona główna",
            link: `/${locale}`
        },
        {
            name: "Szukaj kolekcji",
            link: `/${locale}#search-sets`
        },
    ]

    const nestedMenuElements = [
        {
            name: "Zaloguj",
            link: `/${locale}/login`
        },
        {
            name: "Zarejestruj",
            link: `/${locale}/register`
        },
    ]
    return (
        <div className="m-4">
            <div className="navbar bg-base-100 rounded-lg ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">mystery flashcards</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {mainMenuElements.map(renderMenuElement)}
                        <li>
                            <details>
                                <summary>
                                    Konto
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    {nestedMenuElements.map(renderMenuElement)}
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
            <li key={element.name}>
                <Link href={element.link}>{element.name}</Link>
            </li>
        )
    }
}

export default Header