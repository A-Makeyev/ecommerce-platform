'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import GoogleButton from 'apps/user-ui/src/shared/components/google-button'
import { Eye, EyeOff } from 'lucide-react'


type FormData = {
    email: string
    password: string
}

const Login = () => {
    const rounter = useRouter()
    const [rememberMe, setRememberMe] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const onSubmit = (data: FormData) => {

    }

    return (
        <div className="w-full py-10 min-h-[85vh] bg-[#F1F1F1]">
            <h1 className="text-3xl font-poppins font-semibold text-black text-center">
                Login
            </h1>
            <p className="text-center text-lg font-medium py-3 text-[#00000099]">
                Home · Login
            </p>
            <div className="w-full flex justify-center">
                <div className="md:w-[480px] p-8 bg-white rounded-lg shadow-lg">
                    <h3 className="text-3xl font-semibold text-center mb-2">
                        Login to Ecom
                    </h3>
                    <p className="text-center text-[#00000099] font-semibold mb-4">
                        Don't have an account? {' '}
                        <Link href={"/signup"} className="text-blue-600 hover:text-blue-500 transition">
                            Sign up
                        </Link>
                    </p>
                    <GoogleButton />
                    <div className="flex items-center my-5 text-slate-400 text-sm">
                        <div className="flex-1 border-t border-slate-300" />
                            <span className="px-3">or</span>
                        <div className="flex-1 border-t border-slate-300" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <label className="block text-slate-700 font-medium">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-2 outline-0 rounded-lg border border-slate-400" 
                            { ...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address'
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 font-medium">
                                {String(errors.email.message)}
                            </p>
                        )}
                        <label className="block text-slate-700 font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="w-full p-2 outline-0 rounded-lg border border-slate-400"
                                { ...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <button 
                                type="button"  
                                className="absolute inset-y-0 right-3 flex items-center text-slate-500" 
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <EyeOff /> :<Eye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 font-medium">
                                {String(errors.password.message)}
                            </p>
                        )}
                        <div className="flex justify-between items-center my-4">
                            <label className="flex items-center text-sm text-slate-600">
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                    checked={rememberMe} 
                                    onChange={() => setRememberMe(!rememberMe)} 
                                />
                                Remember me
                            </label>
                            <Link href={"/forgot-password"} className="text-sm text-blue-600 hover:text-blue-500 transition">
                                Forgot password?
                            </Link> 
                        </div>
                        <button type="submit" className="w-full text-lg py-2 rounded-lg cursor-pointer bg-black text-white hover:bg-gray-800 transition">
                            Login
                        </button>
                        {serverError && (
                            <p className="text-red-500 text-sm font-medium text-center">
                                {serverError} 
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login