"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import useTokenVerification from "@/components/hooks/useTokenVerification";
import Link from "next/link";

const SideNav = () => {
	const { admin, staffId, isLoading } =
		useTokenVerification();

	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		window.localStorage.removeItem("token");

		router.push("/login");
	};

	// if (isLoading) {
	// 	return (
	// 		<div className='flex justify-center w-full items-center h-screen'>
	// 			<div className='loaderR'>
	// 				<div className='bar1'></div>
	// 				<div className='bar2'></div>
	// 				<div className='bar3'></div>
	// 				<div className='bar4'></div>
	// 				<div className='bar5'></div>
	// 				<div className='bar6'></div>
	// 				<div className='bar7'></div>
	// 				<div className='bar8'></div>
	// 				<div className='bar9'></div>
	// 				<div className='bar10'></div>
	// 				<div className='bar11'></div>
	// 				<div className='bar12'></div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	if (admin) {
		return (
			<div className='bodyText min-h-screen w-screen bg-gray-50'>
				{/* Sidebar */}
				<div className='absolute left-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white'>
					<Link href="/" className='mt-10 ml-10 text-3xl font-bold'>
						NSEDMS
					</Link>
					<ul className='mt-10 space-y-3'>
						<li
							className={
								pathname === "/dashboard"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
							}
						>
							<Link href='/dashboard'
								className='bodyText flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
										/>
									</svg>
								</span>
								<span className=''>
									Dashboard
								</span>
							</Link>
						</li>

						<li
							className={
								pathname === "/addemployee"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
							}
						>
							<Link href='/addemployee'
								className='bodyText flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M12 4v16m-8-8h16'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</span>
								<span className=''>
									Add Employee
								</span>
							</Link>
						</li>

						<li
							className={
								pathname.startsWith(
									"/employee"
								)
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
							}
						>
							<Link href='/employees'
								className='bodyText flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</span>
								<span className=''>
									Employees
								</span>
								<svg
									className='absolute -top-1/2 -right-1 h-32 w-8 text-white'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='399.349 57.696 100.163 402.081'
									width='1em'
									height='4em'
								>
									<path
										fill='currentColor'
										d='M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z'
									/>
								</svg>
							</Link>
						</li>

						<li
							className={
								pathname === "/search"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
							}
						>
							<Link href='/search'
								className='bodyText flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<circle
											cx='10.5'
											cy='10.5'
											r='7.5'
											stroke='currentColor'
											strokeWidth='2'
										/>
										<path
											d='M15.5 15.5L20 20'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
										/>
									</svg>
								</span>
								<span className=''>
									Search
								</span>
							</Link>
						</li>

						<li
							className={
								pathname ===
								"/leaveapprovals"
									? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
									: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
							}
						>
							<Link href='/leaveapprovals'
								className='bodyText flex flex-row space-x-4'
							>
								{" "}
								<span>
									<svg
										className='w-5 h-5'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M5 20h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zm0-10h14m-14 4h14'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</span>
								<span className=''>
									Leave Approvals
								</span>
							</Link>
						</li>
					</ul>

					<div className='my-2 mt-14 ml-10 flex cursor-pointer'>
						<div>
							<Image
								width={12}
								height={12}
								className='h-12 w-12 object-cover rounded-full'
								src='https://images.unsplash.com/photo-1614807536394-cd67bd4a634b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								alt='User avatar'
								unoptimized
							/>
						</div>
						<div className='ml-3 mt-3'>
							<p className='font-medium'>
								NSE{staffId}
							</p>
						</div>
					</div>

					<button
						className='flex bodyText items-center px-2 py-2 mb-6 ml-8 text-white  hover:opacity-70'
						onClick={handleLogout}
					>
						<svg
							className='w-5 h-5'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16 17l5-5-5-5M21 12H9'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						<span className='bodyText mx-4 font-medium'>
							Logout
						</span>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='bodyText min-h-screen w-screen bg-gray-50'>
			{/* Sidebar */}
			<div className='absolute left-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white'>
				<h1 className='mt-10 ml-10 text-3xl font-bold'>
					NSEDMS
				</h1>
				<ul className='mt-10 space-y-3'>
					<li
						className={
							pathname === "/dashboard"
								? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
								: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
						}
					>
						<Link href='/dashboard'
							className='bodyText flex flex-row space-x-4'
						>
							{" "}
							<span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
									/>
								</svg>
							</span>
							<span className=''>
								Dashboard
							</span>
						</Link>
					</li>

					<li
						className={
							pathname === "/leaveapplication"
								? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
								: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
						}
					>
						<Link href='/leaveapplication'
							className='bodyText flex flex-row space-x-4'
						>
							{" "}
							<span>
								<svg
									className='w-5 h-5'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M5 20h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zm0-10h14m-14 4h14'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</span>
							<span className=''>
								Leave Application
							</span>
						</Link>
					</li>

					<li
						className={
							pathname === "/myleave"
								? " relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 bg-slate-500 "
								: "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600 "
						}
					>
						<Link href='/myleave'
							className='bodyText flex flex-row space-x-4'
						>
							{" "}
							<span>
								<svg
									className='w-5 h-5'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M5 13l4 4L19 7'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</span>
							<span className=''>
								My Leave(s)
							</span>
						</Link>
					</li>
				</ul>

				<div className='my-2 mt-14 ml-10 flex cursor-pointer'>
					<div>
						<Image
							width={12}
							height={12}
							className='h-12 w-12 object-cover rounded-full'
							src='https://images.unsplash.com/photo-1614807536394-cd67bd4a634b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt='User avatar'
							unoptimized
						/>
					</div>
					<div className='ml-3 mt-3'>
						<p className='font-medium'>
							NSE{staffId}
						</p>
					</div>
				</div>

				<button
					className='flex bodyText items-center px-2 py-2 mb-6 ml-8 text-white  hover:opacity-70'
					onClick={handleLogout}
				>
					<svg
						className='w-5 h-5'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M16 17l5-5-5-5M21 12H9'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>

					<span className='bodyText mx-4 font-medium'>
						Logout
					</span>
				</button>
			</div>
			{/* /Sidebar */}
		</div>
	);
};

export default SideNav;
