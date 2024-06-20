"use client";
import React, { useState, useEffect } from "react";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import axios from "axios";

const Dashboard = () => {
	const [totalEmployees, setTotalEmployees] = useState(0);
	const [isBLoading, setIsBLoading] =
		useState<boolean>(true);
		const { admin, staffId, isLoading } =
		useTokenVerification();

	useEffect(() => {
		const fetchTotalEmployees = async () => {
			try {
				const response = await axios.get(
					"https://nsedms-backend.onrender.com/api/employee/totalEmployees"
				);
				setTotalEmployees(
					response.data.totalEmployees
				);
				setIsBLoading(false);
			} catch (error) {
				console.error(
					"Error fetching total employees:",
					error
				);
			}
		};

		fetchTotalEmployees();
	}, []);

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

	
	return (
		<div className='w-full overflow-y-auto md:overflow-y-hidden mt-10 mb-20  mx-auto md:pb-0 pb-10 bg-white flex items-center justify-center'>
			<div className='z-[5] mx-auto w-full px-6 h-full  md:px-10 '>
				<div className='mb-12'>
					<div className='lg:flex-no-wrap -mx-3 flex flex-row flex-wrap items-end'>
						<div className='mr-auto w-full flex-grow px-3'></div>
					</div>
				</div>
				<div className='ml-6 flex flex-wrap font-bold'>
					<div className='mb-4 w-full px-2 lg:w-3/5'>
						<div className='h-full w-full bg-blue-900 p-6'>
							<div className='z-[5] flex flex-col justify-between'>
								{isBLoading ? (
									<div className='loaderR'>
										<div className='bar1'></div>
										<div className='bar2'></div>
										<div className='bar3'></div>
										<div className='bar4'></div>
										<div className='bar5'></div>
										<div className='bar6'></div>
										<div className='bar7'></div>
										<div className='bar8'></div>
										<div className='bar9'></div>
										<div className='bar10'></div>
										<div className='bar11'></div>
										<div className='bar12'></div>
									</div>
								) : (
									<h1 className='text-xl bodyText text-white sm:text-8xl'>
										{totalEmployees}
									</h1>
								)}
								<h6 className='mt-12  text-xl font-bold md:text-3xl md:font-[200] bodyText text-white '>
									Total number of
									employees
								</h6>
							</div>
						</div>
					</div>
					<div className='mb-4 w-full px-2 lg:w-2/5'>
						<div className='h-full w-full bg-yellow-400 p-6'>
							<div className='z-[5] flex flex-col justify-between'>
								<h1 className='text-xl bodyText text-blue-900 sm:text-8xl'>
									1,781
								</h1>
								<h6 className='mt-12  text-xl font-bold md:text-3xl md:font-[200] bodyText text-blue-900'>
									Executive
								</h6>
							</div>
						</div>
					</div>
					<div className='mb-4 w-full px-2 lg:w-1/3'>
						<div className='h-full w-full bg-indigo-600 p-6'>
							<div
								className='absolute z-0 opacity-0 hover:opacity-50'
								style={{
									mixBlendMode:
										"multiply",
								}}
							></div>
							<div className='z-[5] flex flex-col justify-between'>
								<h1 className='text-xl bodyText text-white sm:text-8xl'>
									6,423
								</h1>
								<h6 className='mt-12  text-xl font-bold md:text-3xl md:font-[200] bodyText text-white '>
									Ministries/<br></br>
									Parastatals
								</h6>
							</div>
						</div>
					</div>
					<div className='mb-4 w-full px-2 lg:w-1/3'>
						<div className='h-full w-full bg-blue-400 p-6'>
							<div className='z-[5] flex flex-col justify-between'>
								<h1 className='text-xl bodyText text-white sm:text-8xl'>
									1,134
								</h1>
								<h6 className='mt-12  text-xl font-bold md:text-3xl md:font-[200] bodyText text-white '>
									Judiciary
								</h6>
							</div>
						</div>
					</div>
					<div className='mb-4 w-full px-2 lg:w-1/3'>
						<div className='h-full w-full bg-red-200 p-6'>
							<div className='z-[5] flex flex-col justify-between'>
								<h1 className='text-xl bodyText text-blue-900 sm:text-8xl'>
									1,201
								</h1>
								<h6 className='mt-12  text-xl font-bold md:text-3xl md:font-[200] bodyText text-blue-900'>
									Legistlative
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
export const runtime = "edge";