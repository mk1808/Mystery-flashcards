import React from 'react'

function Header() {
    return (
        <div className="m-4">
            <div className="navbar bg-base-100 rounded-lg ">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">mystery flashcards</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Strona główna</a></li>
                        <li><a>Szukaj kolekcji</a></li>
                        <li>
                            <details>
                                <summary>
                                    Konto
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    <li><a>Zaloguj</a></li>
                                    <li><a>Zarejestruj</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header