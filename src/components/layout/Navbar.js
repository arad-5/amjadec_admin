'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { SlMenu } from 'react-icons/sl'
import Admin from './Admin'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <div className="sticky top-0 left-0 w-full px-6 py-4 border-b bg-white lg:hidden">
                <div className="container flex justify-between items-center mx-auto">
                    <button
                        className=""
                        onClick={() => setIsMenuOpen((curr) => !curr)}
                    >
                        <SlMenu className="text-2xl" />
                    </button>
                    <Admin />
                </div>
            </div>
            {isMenuOpen ? <SideMenu setIsMenuOpen={setIsMenuOpen} /> : null}
        </>
    )
}
const SideMenu = ({ setIsMenuOpen }) => {
    return (
        <div className="h-screen fixed top-0 right-0 w-64 bg-white border-l z-20 p-6">
            <div>
                <button onClick={() => setIsMenuOpen(false)}>
                    <RxCross2 className="text-2xl" />
                </button>
            </div>
            <ul>
                <li>
                    <Link href={'/users'} onClick={() => setIsMenuOpen(false)}>
                        <div className="py-3 border-b">کاربران</div>
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/products'}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="py-3 border-b">سوالات</div>
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/products'}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="py-3 border-b">دیدگاه ها</div>
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/products'}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="py-3 border-b">محصولات</div>
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/categories'}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="py-3 border-b">دسته بندی ها</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
