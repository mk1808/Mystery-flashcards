import Link from 'next/link'
import React from 'react'

async function Header({
    locale, 
    dictionary 
}: {
    locale:string, 
    dictionary: any 
}) {
    const mainMenuElements = [
        {
            name: dictionary.common.mainPage,
            link: `/${locale}`
        },
        {
            name: dictionary.common.searchSets,
            link: `/${locale}#search-sets`
        },
    ]

    const nestedMenuElements = [
        {
            name: dictionary.common.login,
            link: `/${locale}/login`
        },
        {
            name: dictionary.common.register,
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
                                    {dictionary.common.account}
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none z-20 right-0">
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