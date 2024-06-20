"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import Image from "next/image";
import Link from "next/link";

interface ApiResponse {
	employee: EmployeeData;
}

interface EmployeeData {
	employeeId: string;
	firstName: string;
	lastName: string;
	email: string;
	dob: string;
	joinDate: string;
	department: string;
	position: string;
	contact: string;
	emergencyContact: string;
}

const Search = () => {
	const {
		admin,
		error: tokenError,
		isLoading,
	} = useTokenVerification();
	const [searchValue, setSearchValue] =
		useState<string>("");
	const [employee, setEmployee] =
		useState<EmployeeData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setSearchValue(event.target.value);
	};

	const handleSearch = async () => {
		setLoading(true);
		try {
			const response = await axios.get<ApiResponse>(
				`https://nsedms-backend.onrender.com/api/employee/${searchValue}`
			);
			setEmployee(response.data.employee);
			setError(null);
		} catch (error) {
			console.error(
				"Error fetching employee data:",
				error
			);
			setEmployee(null);
			setError("Employee not found");
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='cube-loader'>
					<div className='cube cube1'></div>
					<div className='cube cube2'></div>
					<div className='cube cube3'></div>
					<div className='cube cube4'></div>
				</div>
			</div>
		);
	}

	if (!admin) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<p className='text-lg'>
					Unauthorized access, Please:&nbsp;
					<Link
						href='/login'
						className='text-red-400 underline-offset-4 '
					>
						login
					</Link>
				</p>
			</div>
		);
	}

	return (
		<div className='w-full mt-14 flex mx-auto items-center justify-center flex-col'>
			<div className=' flex md:w-[50vw] w-[80vw] mt-16 '>
				<div className='bodyText flex relative rounded-md w-full px-4 max-w-xl'>
					<input
						type='text'
						name='q'
						id='query'
						placeholder='Enter Staff ID'
						className='bodyText w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500 dark:text-gray-300 dark:border-none'
						value={searchValue}
						onChange={handleChange}
					/>
					<button
						className='inline-flex items-center gap-2 bg-gray-600 text-white text-lg font-semibold py-3 px-6 rounded-r-md'
						onClick={handleSearch}
					>
						<span className=''>
							<svg
								className='text-gray-200 h-5 w-5 p-0 fill-current'
								xmlns='http://www.w3.org/2000/svg'
								xmlnsXlink='http://www.w3.org/1999/xlink'
								version='1.1'
								x='0px'
								y='0px'
								viewBox='0 0 56.966 56.966'
								xmlSpace='preserve'
								width='512px'
								height='512px'
							>
								<path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
							</svg>
						</span>
					</button>
				</div>
			</div>

			<div className='my-10'>
				{loading && (
					<div className='cube-loader'>
						<div className='cube cube1'></div>
						<div className='cube cube2'></div>
						<div className='cube cube3'></div>
						<div className='cube cube4'></div>
					</div>
				)}
			</div>

			{tokenError && (
				<p className='text-red-500 mt-4'>
					{tokenError}
				</p>
			)}

			{error && (
				<p className='text-red-500 mt-4'>{error}</p>
			)}

			{employee && (
				<div className='w-full  flex items-center justify-center flex-col mt-4'>
					<Image
						width={60}
						height={60}
						className='object-cover mb-10  mx-auto w-60 h-60 rounded-full'
						src='https://images.unsplash.com/photo-1614807536394-cd67bd4a634b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt=''
						unoptimized
					/>
					<div className='w-full flex items-center justify-center flex-col bodyText'>
						<dl className='-my-3 bodyText divide-y divide-gray-100 text-sm'>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Employee ID:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									NSE{employee.employeeId}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Name:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{employee.firstName}{" "}
									{employee.lastName}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Email:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{employee.email}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									DOB:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{employee.dob}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Join Date:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{employee.joinDate}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Department:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{employee.department}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Position:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{employee.position}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Contact:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{employee.contact}
								</dd>
							</div>
							<div className='grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
								<dt className='font-medium text-gray-900'>
									Emergency Contact:
								</dt>
								<dd className='text-gray-700 sm:col-span-2'>
									{
										employee.emergencyContact
									}
								</dd>
							</div>
						</dl>
					</div>
				</div>
			)}
		</div>
	);
};

export default Search;
export const runtime = 'edge';