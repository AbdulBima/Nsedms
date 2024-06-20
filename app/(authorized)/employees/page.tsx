"use client";
import React from "react";
import Link from "next/link";
import useTokenVerification from "../../../components/hooks/useTokenVerification";

const Employees = () => {
	const { admin, error, isLoading } =
		useTokenVerification();

	// if (isLoading) {
	// 	return (
	// 		<div className='flex justify-center items-center h-screen'>
	// 			<div className='cube-loader'>
	// 				<div className='cube cube1'></div>
	// 				<div className='cube cube2'></div>
	// 				<div className='cube cube3'></div>
	// 				<div className='cube cube4'></div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	// if (!admin) {
	// 	return (
	// 		<div className='w-full h-screen flex justify-center items-center'>
	// 			<p className='text-lg'>
	// 				Unauthorized admin access, Please:&nbsp;{" "}
	// 				<Link
	// 					href='/login'
	// 					className='text-red-400 underline-offset-4 '
	// 				>
	// 					login
	// 				</Link>
	// 			</p>
	// 		</div>
	// 	);
	// }

	return (
		<>
			<div className='w-full mx-auto mt-24 md:px-20 md:mt-2 overflow-y-hidden md:overscroll-y-hidden h-screen mx-auto bg-white flex items-center justify-center'>
				<div className='z-10 mx-auto w-full px-6 my-4 md:py-6 sm:px-8 sm:py-16'>
					<div className='mx-auto grid grid-cols-1 md:grid-cols-2 font-bold '>
						<div className='mb-4 w-full px-2 '>
							<Link href='/employees/executive'>
								<div className='h-full w-full hover:transform-gpu hover:scale-95 cursor-pointer bg-yellow-400 p-6'>
									<div className='z-10 flex flex-col justify-between'>
										<h6 className=' text-2xl md:text-6xl font-bold bodyText text-blue-900 '>
											Executive
										</h6>

										<h1 className='text-lg md:text-3xl mt-6 bodyText text-blue-900 '>
											1,781 -
											Employees
										</h1>

										<h1 className='text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-blue-700 bodyText text-blue-900 '>
											view
										</h1>
									</div>
								</div>{" "}
							</Link>
						</div>

						<div className='mb-4 w-full px-2 '>
							<Link href='/employees/minisPar'>
								{" "}
								<div className='h-full w-full hover:transform-gpu hover:scale-95 cursor-pointer bg-indigo-600 p-6'>
									<div
										className='absolute z-0 opacity-0 hover:opacity-50'
										style={{
											mixBlendMode:
												"multiply",
										}}
									></div>
									<div className='z-10 flex flex-col justify-between'>
										<h6 className='md:hidden text-2xl md:text-6xl font-bold bodyText text-white '>
											Ministries/Parastatals
										</h6>
										<h6 className='hidden md:flex text-2xl md:text-5xl font-bold bodyText text-white '>
											Ministries/
											<br></br>
											Parastatals
										</h6>

										<h1 className='text-lg md:text-3xl mt-6 bodyText text-white '>
											6,423 -
											Employees
										</h1>

										<h1 className='text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-white bodyText text-white '>
											view
										</h1>
									</div>
								</div>{" "}
							</Link>
						</div>
						<div className='mb-4 w-full px-2 '>
							<Link href='/employees/judiciary'>
								<div className='h-full w-full  hover:transform-gpu hover:scale-95 cursor-pointer bg-blue-400 p-6'>
									<div className='z-10 flex flex-col justify-between'>
										<h6 className=' text-2xl md:text-6xl font-bold bodyText text-white '>
											Judiciary
										</h6>

										<h1 className='text-lg md:text-3xl mt-6 bodyText text-white '>
											1,134 -
											Employees
										</h1>

										<h1 className='text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-white bodyText text-white '>
											view
										</h1>
									</div>
								</div>{" "}
							</Link>
						</div>

						<div className='mb-4 w-full px-2 '>
							<Link href='/employees/legistelative'>
								<div className='h-full w-full hover:transform-gpu hover:scale-95 cursor-pointer bg-red-200 p-6'>
									<div className='z-10 flex flex-col justify-between'>
										<h6 className=' text-2xl md:text-5xl font-bold bodyText text-blue-900 '>
											Legistelative
										</h6>

										<h1 className='text-lg md:text-3xl mt-6 bodyText text-blue-900 '>
											1,201 -
											Employees
										</h1>

										<h1 className='text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-blue-700 bodyText text-blue-900 '>
											view
										</h1>
									</div>
								</div>{" "}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Employees;
export const runtime = 'edge';