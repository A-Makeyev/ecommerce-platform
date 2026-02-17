'use client'

import { useEffect, useState, useRef } from 'react'
import { navItems } from '../configs/constants'
import { AlignLeft, ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'
import ProfileIcon from '../assets/svgs/profile-icon'
import CartIcon from '../assets/svgs/cart-icon'
import HeartIcon from '../assets/svgs/heart-icon'


const HeaderBottom = () => {
    const [show, setShow] = useState(false)
    const [sticky, setSticky] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchOpen(false)
            }
        }

        if (searchOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [searchOpen])

    return (
        <div className={`${sticky ? "fixed top-0 left-0 z-[100] bg-white shadow-lg" : "relative"} w-full transition-all duration-300`}>
            <div className={`${sticky ? "pt-3" : "py-0"} w-[80%] relative m-auto flex items-center justify-between`}>
                <div
                    className={`${show && sticky ? "rounded-t-lg" : show ? "" : sticky ? "rounded-lg" : "rounded-b-lg"} w-[250px] flex items-center justify-between px-5 h-[50px] bg-[#3489FF] transition-all duration-300 cursor-pointer`}
                    onClick={() => setShow(!show)}
                >
                    <div className="flex items-center gap-2">
                        <AlignLeft color="white" />
                        <span className="text-white font-medium">All Categories</span>
                    </div>
                    {show ?
                        <ChevronDown color="white" className="rotate-180 transition duration-300" />
                        :
                        <ChevronDown color="white" className="transition duration-300" />
                    }
                </div>
                <div className={`${sticky ? "top-[80px]" : "top-[50px]"} ${show ? "opacity-100 visible" : "opacity-0 invisible"} absolute left-0 w-[250px] h-[400px] bg-[#F5F5F5] transition-all duration-300`}>

                </div>

                <div className="w-[30%] relative flex justify-start">
                    {sticky && (
                        <div ref={searchRef} className={`${searchOpen ? "w-[300px]" : "w-[55px]"} transition-all duration-300`}>
                            <div className="flex items-center h-[50px] border-[2px] border-[#3489FF] rounded-lg bg-white overflow-hidden">
                                <input
                                    type="text"
                                    placeholder="Search products"
                                    autoFocus={searchOpen}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            console.log('Search:', e.currentTarget.value)
                                            setSearchOpen(false)
                                        }
                                    }}
                                    className={`flex-1 px-3 text-sm font-medium outline-none transition-all duration-300 ${searchOpen ? "opacity-100" : "opacity-0 hidden"}`}
                                />
                                <button
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    className="w-[55px] h-full bg-[#3489FF] flex items-center justify-center active:scale-95 transition-all flex-shrink-0"
                                >
                                    <Search color="white" className="hover:scale-105 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    {navItems.map((item: NavItemTypes, index: number) => (
                        <Link href={item.href} key={index} className="px-5 font-medium text-lg hover:text-blue-600 transition">
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div>
                    {sticky && (
                        <div className="w-[80%] py-5 m-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Link href={"/login"} className="flex items-center justify-center w-[40px] h-[40px] border-2 border-[#010F1C1A] rounded-full hover:scale-105 transition-transform">
                                        <ProfileIcon />
                                    </Link>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Link href={"/whishlist"} className="relative hover:text-slate-600 transition">
                                        <HeartIcon />
                                        <div className="flex items-center justify-center absolute top-[-10px] right-[-15px] w-6 h-6 border-2 border-white bg-red-500 rounded-full">
                                            <span className="text-white font-medium text-xs">69</span>
                                        </div>
                                    </Link>
                                    <Link href={"/cart"} className="relative hover:text-slate-600 transition">
                                        <CartIcon />
                                        <div className="flex items-center justify-center absolute top-[-10px] right-[-15px] w-6 h-6 border-2 border-white bg-red-500 rounded-full">
                                            <span className="text-white font-medium text-xs">69</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HeaderBottom