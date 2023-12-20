"use client"
import Link from 'next/link';
import React from 'react'

function Footer({ dictionary }: { dictionary: any }) {
    const year = new Date().getFullYear();
    const cl = () => console.log("aaa")
    return (
        <footer className="footer p-10 mt-4 bg-base-200 text-base-content grid-cols-5">
            <aside>
                <Link href="/" className='mb-2'>
                    <img src='/images/logo2.png' className='h-[100px]' />
                </Link>
                <p>Copyright © {year} Monika Kordoń, Marek Czopor</p>
            </aside>

            <nav />
            <nav className="ps-3 border-s-2 border-slate-600">
                <header className="footer-title">{dictionary.common.browse}</header>
                <a className="link link-hover">{dictionary.common.mainPage}</a>
                <a className="link link-hover">{dictionary.common.searchSets}</a>
                <a className="link link-hover">{dictionary.common.login}</a>
                <a className="link link-hover">{dictionary.common.register}</a>
            </nav>
            <nav className="ps-3 border-s-2 border-slate-600">
                <header className="footer-title">Język</header>
                <a className="link link-hover">polski</a>
                <a className="link link-hover" href='javascript:;' onClick={cl} >angielski</a>
                <a className='min-h-[1.25rem]'></a>
                <a className='min-h-[1.25rem]'></a>
            </nav>
            <nav className="ps-3 border-s-2 border-slate-600">
                <header className="footer-title">Kontakt</header>
                <a className="link link-hover">GitHub - Monika Kordoń</a>
                <a className="link link-hover">GitHub - Marek Czopor</a>
                <a className='min-h-[1.25rem]'></a>
                <a className='min-h-[1.25rem]'></a>
            </nav>
        </footer>
    )
}

export default Footer