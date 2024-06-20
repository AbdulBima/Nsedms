"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Employee {
	_id: string;
	employeeId: string;
	firstName: string;
	lastName: string;
	department: string;
	position: string;
	contact: string;
}

const ExecutiveEmployeesPage = () => {
	const [employees, setEmployees] = useState<Employee[]>(
		[]
	);
	const [selectedDepartment, setSelectedDepartment] =
		useState<string>("");
	const [filteredEmployees, setFilteredEmployees] =
		useState<Employee[]>([]);
	const [isLoading, setIsLoading] =
		useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<{
					employees: Employee[];
				}>(
					"https://nsedms-backend.onrender.com/api/employee/all/getAllEmployees"
				);
				setEmployees(response.data.employees);
				setIsLoading(false);
			} catch (error) {
				console.error(
					"Error fetching employees:",
					error
				);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (selectedDepartment === "") {
			setFilteredEmployees(employees);
		} else {
			const filtered = employees.filter(
				(employee) =>
					employee.department ===
					selectedDepartment
			);
			setFilteredEmployees(filtered);
		}
	}, [selectedDepartment, employees]);

	const handleDepartmentChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedDepartment(e.target.value);
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

	// Extract unique departments
	const uniqueDepartments = Array.from(
		new Set(
			employees.map((employee) => employee.department)
		)
	);

	return (
		<div className='w-full flex mt-10 flex-col overflow-y-auto'>
			<div className='bodyText ml-24 flex mt-16 md:mt-6 items-center py-4 overflow-x-auto whitespace-nowrap'>
				<Link
					href='/'
					className='text-gray-600 dark:text-gray-200'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-5 h-5'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
					</svg>
				</Link>

				<span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-5 h-5'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
							clipRule='evenodd'
						/>
					</svg>
				</span>

				<Link
					href='/executive'
					className='text-gray-600 dark:text-gray-200 hover:underline'
				>
					Executive
				</Link>
			</div>

			<div className='w-full flex flex-col items-center mt-10'>
				<select
					className='select select-bordered bodyText flex h-10 w-72 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
					value={selectedDepartment}
					onChange={handleDepartmentChange}
				>
					<option
						className=' flex cursor-default items-center justify-center py-1'
						value=''
					>
						All Departments
					</option>
					{/* Render options for unique departments */}
					{uniqueDepartments.map((department) => (
						<option
							key={department}
							value={department}
						>
							{department}
						</option>
					))}
				</select>
			</div>

			<div className='overflow-y-auto py-20 mx-auto px-8 md:px-40'>
				<table className='min-w-full bodyText bg-white font-[sans-serif]'>
					<thead className='bg-gray-800 whitespace-nowrap'>
						<tr>
							<th className='px-6 py-3 text-left text-sm font-semibold text-white'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-white'>
								Role/Title
							</th>
						</tr>
					</thead>
					<tbody className='whitespace-nowrap'>
						{filteredEmployees.map(
							(employee) => (
								<tr key={employee._id}>
									<td className='px-6 py-4 text-sm'>
										{employee.firstName}{" "}
										{employee.lastName}
									</td>
									<td className='px-6 py-4 text-sm'>
										{employee.position}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ExecutiveEmployeesPage;
