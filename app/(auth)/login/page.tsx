"use client";

import React, { useState, useCallback, useMemo, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Login: React.FC = () => {
    const [employeeId, setEmployeeId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleEmployeeIdChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmployeeId(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://backendv2-smz4.onrender.com/api/employee/login",
                { employeeId, password },
                { withCredentials: true }
            );

            setEmployeeId("");
            setPassword("");
            setIsLoading(false);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                router.prefetch("/dashboard");
                toast.success("Login successful, you will be redirected to your dashboard shortly", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                router.push("/dashboard");
            } else {
                const errorMessage = response.data.error || "Please check username and password";
                toast.error(errorMessage, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setIsLoading(false);
        }
    }, [employeeId, password, router]);

    const formContent = useMemo(() => (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='employeeID' className='block bodyText mb-2 text-sm text-gray-600'>
                    Employee ID
                </label>
                <input
                    type='text'
                    name='employeeID'
                    id='employeeID'
                    placeholder=''
                    value={employeeId}
                    onChange={handleEmployeeIdChange}
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                />
            </div>
            <div className='mt-6'>
                <label htmlFor='password' className='text-sm text-gray-600'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Your Password'
                    value={password}
                    onChange={handlePasswordChange}
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900  dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                />
            </div>
            <div className='mt-6'>
                {isLoading ? (
                    <div className='cube-loader'>
                        <div className='cube cube1'></div>
                        <div className='cube cube2'></div>
                        <div className='cube cube3'></div>
                        <div className='cube cube4'></div>
                    </div>
                ) : (
                    <button
                        type='submit'
                        className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                    >
                        Sign in
                    </button>
                )}
            </div>
        </form>
    ), [employeeId, password, isLoading, handleEmployeeIdChange, handlePasswordChange, handleSubmit]);

    return (
        <div className='bg-white flex bodyText flex-row'>
            <div className='flex items-center w-full mt-28 lg:mt-0 px-6 mx-auto lg:w-[30vw]'>
                <div className='flex-1'>
                    <div className='text-center'>
                        <h6 className='ml-20 my flex lg:hidden text-bold text-5xl bodyText font-bold text-gray-700'>
                            NSEDMS
                        </h6>
                        <h3 className='flex lg:hidden text-gray-500 text-sm bodyText'>
                            Niger State Employees Database Management System
                        </h3>
                        <p className='mt-12 lg:mt-3 text-gray-500 text-lg bodyText '>
                            Sign in to access your dashboard
                        </p>

                        <div className="flex flex-col pt-4 pb-2 text-sm space-y-2 ">
							<h2 >Admin Test ID: 2</h2>
							<h2 >Employee Test ID: 1</h2>
							
                            <h2>Test password: 123456789</h2>

							</div>

                    </div>
                    <div className='mt-8 bodyText'>
                        {formContent}
                        <p className='mt-6 text-sm text-center text-gray-400'>
                            Don&apos;t have an account yet?
                            <Link href='signup' className='text-blue-500 focus:outline-none focus:underline hover:underline'>
                                Sign up
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden relative lg:flex bg-cover h-screen w-[70vw] bg-[url('/images/bago.jpg')]">
                <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent'></div>
                <div className='absolute top-0 left-0 w-full h-full opacity-60 bg-gradient-to-t from-black to-transparent'></div>
                <h6 className='absolute inset-0 flex items-center justify-center text-9xl font-bold text-white'>
                    NSEDMS
                </h6>
                <h3 className='absolute inset-0 text-center flex items-center justify-center mt-36 text-white text-2xl bodyText'>
                    Niger State Employees Database Management System
                </h3>
            </div>
            <ToastContainer
                position='top-left'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Login;
