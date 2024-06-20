"use client";

import React, {
	useState,
	ChangeEvent,
	FormEvent,
} from "react";
import { z } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTokenVerification from "../../../components/hooks/useTokenVerification";

interface FormData {
	TypeOfLeave: string;
	startdate: string;
	enddate: string;
	totalnumberofdays: string;
	reasonforleave: string;
}

const LeaveApplication = () => {
	const { admin, staffId, isLoading } =
		useTokenVerification();
	const [isLeaveLoading, setIsLeaveLoading] =
		useState(false);
	const [formData, setFormData] = useState<FormData>({
		TypeOfLeave: "",
		startdate: "",
		enddate: "",
		totalnumberofdays: "",
		reasonforleave: "",
	});

	const schema = z.object({
		TypeOfLeave: z.string(),
		startdate: z.string(),
		enddate: z.string(),
		totalnumberofdays: z.string(),
		reasonforleave: z.string(),
	});

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setIsLeaveLoading(true);

		try {
			const validatedData = schema.parse(formData);

			const response = await axios.post(
				`https://backendv2-smz4.onrender.com/api/leave`,
				{ ...validatedData, EmployeeID: staffId }
			);

			toast.success(
				`Your leave request has been successfully submitted. Please check the 'My Leave' page for any updates.`,
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

			setFormData({
				TypeOfLeave: "",
				startdate: "",
				enddate: "",
				totalnumberofdays: "",
				reasonforleave: "",
			});
		} catch (error) {
			console.error("An error occurred:", error);
		}

		setIsLeaveLoading(false);
	};

	const handleInputChange = (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
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

	if (admin) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<p className='text-lg'>
					Admin cannot create leave
				</p>
			</div>
		);
	}

	return (
		<>
			<div className='w-full pb-20 p-6 mt-14 md:mt-8 m-auto mx-auto bg-white dark:bg-gray-800'>
				<h5 className='bodytext text-gray-800 text-2xl md:text-5xl text-center'>
					Leave Application Form
				</h5>

				<form
					className='bodyText mt-12 md:mt-16 md:px-80'
					onSubmit={handleSubmit}
				>
					<div className='mt-5'>
						<label
							htmlFor='TypeOfLeave'
							className='block text-sm text-gray-800 dark:text-gray-200'
						>
							Type of Leave (vacation, sick
							leave, personal)
						</label>
						<input
							type='text'
							name='TypeOfLeave'
							value={formData.TypeOfLeave}
							onChange={handleInputChange}
							className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>

					<div className='mt-5'>
						<label
							htmlFor='startdate'
							className='block text-sm text-gray-800 dark:text-gray-200'
						>
							Start Date (DD/MM/YYYY)
						</label>
						<input
							type='text'
							name='startdate'
							value={formData.startdate}
							onChange={handleInputChange}
							className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>

					<div className='mt-5'>
						<label
							htmlFor='enddate'
							className='block text-sm text-gray-800 dark:text-gray-200'
						>
							End Date (DD/MM/YYYY)
						</label>
						<input
							type='text'
							name='enddate'
							value={formData.enddate}
							onChange={handleInputChange}
							className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>

					<div className='mt-5'>
						<label
							htmlFor='totalnumberofdays'
							className='block text-sm text-gray-800 dark:text-gray-200'
						>
							Total Number of Days
						</label>
						<input
							type='text'
							name='totalnumberofdays'
							value={
								formData.totalnumberofdays
							}
							onChange={handleInputChange}
							className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>

					<div className='mt-5'>
						<label
							htmlFor='reasonforleave'
							className='block text-sm text-gray-800 dark:text-gray-200'
						>
							Reason for Leave
						</label>
						<input
							type='text'
							name='reasonforleave'
							value={formData.reasonforleave}
							onChange={handleInputChange}
							className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
						/>
					</div>

					<div className='mt-14'>
						{isLeaveLoading ? (
							<div className='cube-loader'>
								<div className='cube cube1'></div>
								<div className='cube cube2'></div>
								<div className='cube cube3'></div>
								<div className='cube cube4'></div>
							</div>
						) : (
							<button
								type='submit'
								className='bodyText w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
							>
								Submit
							</button>
						)}
					</div>
				</form>
			</div>

			<ToastContainer
				position='top-left'
				autoClose={3000}
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

export default LeaveApplication;
export const runtime = 'edge';