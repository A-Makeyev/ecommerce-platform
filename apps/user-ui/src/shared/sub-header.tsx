'use client'

import { useEffect, useState } from 'react'
import { navItems } from '../configs/constants'
import { AlignLeft, ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'
import ProfileIcon from '../assets/svgs/profile-icon'
import CartIcon from '../assets/svgs/cart-icon'
import HeartIcon from '../assets/svgs/heart-icon'


const HeaderBottom = () => {
    const [show, setShow] = useState(false)
    const [sticky, setSticky] = useState(false)

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

    return (
        <div className={`${sticky ? "fixed top-0 left-0 z-[100] bg-white shadow-lg" : "relative"} w-full transition-all duration-300`}>
            <div className={`${sticky ? "pt-3" : "py-0"} w-[80%] relative m-auto flex items-center justify-between`}>
                <div
                    className={`${sticky && "-mb-2"} w-[250px] flex items-center justify-between px-5 h-[50px] bg-[#3489FF] cursor-pointer`}
                    onClick={() => setShow(!show)}
                >
                    <div className="flex items-center gap-2">
                        <AlignLeft color="white" />
                        <span className="text-white font-medium">All Categories</span>
                    </div>
                    { show ?
                        <ChevronDown color="white" className="rotate-180 transition duration-300" />
                        :
                        <ChevronDown color="white" className="transition duration-300" />
                    }
                </div>
                <div className={`${sticky ? "top-[70px]" : "top-[50px]"} ${show ? "opacity-100 visible" : "opacity-0 invisible"} absolute left-0 w-[250px] h-[400px] bg-[#F5F5F5] transition-all duration-300`}>

                </div>
                <div className="flex items-center">
                    { navItems.map((item: NavItemTypes, index: number) => (
                        <Link href={item.href} key={index} className="px-5 font-medium text-lg">
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