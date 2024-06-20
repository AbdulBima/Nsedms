"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
	const [employeeId, setEmployeeId] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] =
		useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		setIsLoading(true);

		try {
			const response = await axios.post(
				"https://backendv2-smz4.onrender.com/api/employee",
				{
					employeeId,
					password,
				}
			);
			console.log(response.data);
			toast.success(
				`User with Employee Id: NSE${response.data.employeeId} created`,
				{
					position: "top-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				}
			);

			setEmployeeId("");
			setPassword("");
			setConfirmPassword("");
			setIsLoading(false);
		} catch (error) {
			console.error("Error signing up:", error);
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className='bg-white flex bodyText flex-row '>
				<div className='flex items-center w-full mt-28 md:mt-0 px-6 mx-auto md:w-[30vw]'>
					<div className='flex-1'>
						<div className='text-center'>
							<h6 className='ml-20 my flex md:hidden text-bold text-5xl bodyText  font-bold text-gray-700 '>
								NSEDMS
							</h6>
							<h3 className='flex md:hidden text-gray-500 text-sm bodyText dark:text-gray-600'>
								Niger State Employees
								Database Management System
							</h3>
							<p className='mt-12 md:mt-3 text-gray-500 text-xl bodyText dark:text-gray-300'>
								Sign up to create your
								account
							</p>
						</div>

						<div className='mt-8 bodyText'>
							<form onSubmit={handleSubmit}>
								<div>
									<label
										htmlFor='employeeID'
										className='block bodyText mb-2 text-sm text-gray-600 '
									>
										Employee ID
									</label>
									<input
										type='text'
										name='employeeID'
										id='employeeID'
										placeholder=''
										value={employeeId}
										onChange={(e) =>
											setEmployeeId(
												e.target
													.value
											)
										}
										className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
									/>
								</div>

								<div className='mt-6'>
									<label
										htmlFor='password'
										className='text-sm text-gray-600 '
									>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										placeholder='Your Password'
										value={password}
										onChange={(e) =>
											setPassword(
												e.target
													.value
											)
										}
										className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
									/>
								</div>

								<div className='mt-6'>
									<label
										htmlFor='cpassword'
										className='text-sm text-gray-600 '
									>
										Confirm Password
									</label>
									<input
										type='password'
										name='cpassword'
										id='cpassword'
										placeholder='Rewrite Password'
										value={
											confirmPassword
										}
										onChange={(e) =>
											setConfirmPassword(
												e.target
													.value
											)
										}
										className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
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
											Sign up
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
					<div className="hidden relative md:flex bg-cover h-screen w-[70vw] bg-[url('/images/bago.jpg')]">
						<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent'></div>
						<div className='absolute top-0 left-0 w-full h-full opacity-60 bg-gradient-to-t from-black to-transparent'></div>

						<h6 className='absolute inset-0 flex items-center justify-center  text-9xl font-bold text-white '>
							NSEDMS
						</h6>
						<h3 className='absolute inset-0 text-center flex items-center justify-center mt-36 text-white text-2xl bodyText'>
							Niger State Employees Database
							Management System
						</h3>
					</div>
				</div>
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
		</>
	);
};

export default SignUp;
