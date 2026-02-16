import { Search } from 'lucide-react'
import Link from 'next/link'
import ProfileIcon from '../../assets/svgs/profile-icon'
import HeartIcon from '../../assets/svgs/heart-icon'
import CartIcon from '../../assets/svgs/cart-icon'
import HeaderBottom from '../header-bottom'


const Header = () => {
    return (
        <div className="w-full bg-white">
            <div className="w-[80%] py-5 m-auto flex items-center justify-between">
                <div>
                    <Link href={"/"}>
                        <span className="text-3xl font-600">Ecom</span>
                    </Link>
                </div>
                <div className="w-[50%] relative">
                    <input type="text" placeholder="Search products.." className="w-full px-4 font-poppins font-medium border-[2.5px] border-[#3489FF] outline-none h-[55px]" />
                    <div className="w-[60px] flex items-center justify-center h-[55px] bg-[#3489FF] absolute top-0 right-0 cursor-pointer">
                        <Search color="white" />
                    </div>
                </div>
                <div className="flex items-center gap-8">
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
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Link href={"/login"} className="flex items-center justify-center w-[40px] h-[40px] border-2 border-[#010F1C1A] rounded-full hover:scale-105 transition-transform">
                            <ProfileIcon />
                        </Link>
                        <Link href={"/login"}>
                            <span className="font-semibold hover:text-slate-700 transition">Sign in</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="border-b border-b-slate-300" />
            <HeaderBottom />
        </div>
    )
}
 
export default Header