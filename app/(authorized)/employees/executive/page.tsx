"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import useTokenVerification from "@/components/hooks/useTokenVerification";

interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  contact: string;
}

const EmployeesExecutive: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { admin, isLoading } = useTokenVerification();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isELoading, setEIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://nsedms-backend.onrender.com/api/employee/all/getAllEmployees");
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setEIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = selectedDepartment
      ? employees.filter(employee => employee.department === selectedDepartment)
      : employees;

    setFilteredEmployees(filtered);
  }, [selectedDepartment, employees]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  if (isELoading || isLoading) {
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
          Unauthorized access, Please:&nbsp;{" "}
          <Link href='/login' className='text-red-400 underline-offset-4'>
            login
          </Link>
        </p>
      </div>
    );
  }

  const uniqueDepartments = Array.from(new Set(employees.map(employee => employee.department)));

  return (
    <div className='flex justify-center md:pt-40 pt-28 items-center h-screen'>
      <div className='w-full mx-auto max-w-4xl'>
        <div className='mx-auto  flex flex-col overflow-x-hidden justify-center overflow-y-auto items-center'>
          <div className='bodyText md:-ml-60 flex items-center py-4 overflow-x-auto md:overflow-x-hidden whitespace-nowrap'>
            <Link href='/' className='text-gray-600 dark:text-gray-200'>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
                <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
              </svg>
            </Link>
            <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <Link href='/employees' className='text-gray-600 dark:text-gray-200 hover:underline'>
              Employees
            </Link>
            <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <Link href='/employees/executive' className='text-gray-600 dark:text-gray-200 hover:underline'>
              Executive
            </Link>
          </div>
          <div className='w-full flex justify-center mt-16'>
            <select
              className='select select-bordered bodyText flex h-10 w-72 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option className='flex cursor-default items-center justify-center py-1' value=''>
                All Departments
              </option>
              {uniqueDepartments.map(department => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="py-10 px-10 md:px-0 text-center bodytext text-black">
              Click employee Id to view more details about an employee
            </p>
          </div>
          <div className='overflow-y-auto mt-8 md:mt-6 md:overflow-x-hidden pb-40 mx-auto'>
            <table className='min-w-full md:overflow-x-hidden bodyText bg-white font-[sans-serif]'>
              <thead className='bg-gray-800 whitespace-nowrap'>
                <tr>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-white'>Employee ID</th>
                  <th className='px-6 py-3 text-left text-sm font-semibold text-white'>Name</th>
                  <th className='hidden md:table-cell px-6 py-3 text-left text-sm font-semibold text-white'>Department</th>
                  <th className='hidden md:table-cell px-6 py-3 text-left text-sm font-semibold text-white'>Position</th>
                  <th className='hidden md:table-cell px-6 py-3 text-left text-sm font-semibold text-white'>Contact</th>
                  <th className='hidden md:table-cell px-6 py-3 text-left text-sm font-semibold text-white'>Actions</th>
                </tr>
              </thead>
              <tbody className='whitespace-nowrap'>
                {filteredEmployees.map(employee => (
                  <tr key={employee._id}>
                    <td className='px-6 py-4 underline underline-offset-4 hover:opacity-80 hover:scale-105 text-sm'>
                      <Link href={`/employeedetail/${employee.employeeId}`}>
                        NSE{employee.employeeId}
                      </Link>
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      {`${employee.firstName} ${employee.lastName}`}
                    </td>
                    <td className='hidden md:table-cell px-6 py-4 text-sm'>{employee.department}</td>
                    <td className='hidden md:table-cell px-6 py-4 text-sm'>{employee.position}</td>
                    <td className='hidden md:table-cell px-6 py-4 text-sm'>{employee.contact}</td>
                    <td className='hidden md:table-cell px-6 py-4'>
                      <button className='mr-4' title='Edit'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 fill-blue-500 hover:fill-blue-700'
                          viewBox='0 0 348.882 348.882'
                        >
                          <path
                            d='m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z'
                            data-original='#000000'
                          />
                          <path
                            d='M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z'
                            data-original='#000000'
                          />
                        </svg>
                      </button>
                      <button className='mr-4' title='Delete'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 fill-red-500 hover:fill-red-700'
                          viewBox='0 0 24 24'
                        >
                          <path
                            d='M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z'
                            data-original='#000000'
                          />
                          <path
                            d='M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z'
                            data-original='#000000'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesExecutive;
export const runtime = 'edge';
