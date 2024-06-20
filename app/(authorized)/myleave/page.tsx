"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import useTokenVerification from "../../../components/hooks/useTokenVerification";

interface LeaveRequest {
	_id: string;
	TypeOfLeave: string;
	startdate: string;
	enddate: string;
	status: boolean;
}

const MyLeave: React.FC = () => {
	const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
	const { admin, staffId, isLoading } = useTokenVerification();

	useEffect(() => {
		const fetchLeaveRequests = async () => {
			try {
				const response = await axios.get<LeaveRequest[]>(
					`https://backendv2-smz4.onrender.com/api/leave/leaveCreator/${staffId}`
				);
				setLeaveRequests(response.data);
			} catch (error) {
				console.error("Error fetching leave requests:", error);
			}
		};

		fetchLeaveRequests();
	}, [staffId]);

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
				<p className='text-lg'>No Access</p>
			</div>
		);
	}

	return (
		<div className='w-full mt-8 md:mt-0 py-10 px-8 md:px-60 overflow-y-auto'>
			<h5 className='bodytext mt-10 md:py-6 text-gray-800 text-2xl md:text-5xl text-center'>
				My Leave(s)
			</h5>
			<table className='min-w-full bodyText py-20 bg-white font-[sans-serif]'>
				<thead className='bg-gray-800 whitespace-nowrap'>
					<tr>
						<th className='px-6 py-3 text-left text-sm font-semibold text-white'>
							Leave Request ID
						</th>
						<th className='px-6 py-3 text-left text-sm font-semibold text-white'>
							Leave Type
						</th>
						<th className='px-6 py-3 text-left text-sm font-semibold text-white'>
							Start Date
						</th>
						<th className='px-6 py-3 text-left text-sm font-semibold text-white'>
							End Date
						</th>
						<th className='px-6 py-3 text-left text-sm font-semibold text-white'>
							Approval Status
						</th>
					</tr>
				</thead>
				<tbody className='whitespace-nowrap'>
					{leaveRequests.map((request, index) => (
						<tr key={index} className='text-black even:bg-blue-50'>
							<td className='px-6 py-4 text-lg text-black'>
								{request._id}
							</td>
							<td className='px-6 py-4 text-sm'>
								{request.TypeOfLeave}
							</td>
							<td className='px-6 py-4 text-sm'>
								{request.startdate}
							</td>
							<td className='px-6 py-4 text-sm'>
								{request.enddate}
							</td>
							<td className='px-6 py-4 text-sm'>
								{request.status ? "Approved" : "Pending"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MyLeave;
export const runtime = 'edge';
