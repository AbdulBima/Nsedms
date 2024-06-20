"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import useTokenVerification from "@/components/hooks/useTokenVerification";
import Image from "next/image";
import Link from "next/link";

interface Employee {
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

const EmployeeDetails = () => {
  const { admin, error, isLoading } = useTokenVerification();
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://nsedms-backend.onrender.com/api/employee/${id}`
        );
        setEmployee(response.data.employee);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <div className="cube-loader">
          <div className="cube cube1"></div>
          <div className="cube cube2"></div>
          <div className="cube cube3"></div>
          <div className="cube cube4"></div>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <p className="mx-auto mt-60">
        Unauthorized. Please:&emsp;
        <Link className="text-red-400 underline-offset-4" href="/login">
          login
        </Link>
        .
      </p>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!employee) {
    return <p className="mx-auto mt-60">Employee not found</p>;
  }

  return (
    <div className="flex bodyText mt-14 mb-20 px-0 md:w-[50vw] w-[80vw] mx-auto">
      <div className="w-full flex items-center justify-center flex-col">
        <Image
          width={60}
          height={60}
          className="object-cover mb-16 mt-5 mx-auto w-60 h-60 rounded-full"
          src="https://images.unsplash.com/photo-1614807536394-cd67bd4a634b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Employee Photo"
          unoptimized
        />
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          {[
            ["Employee ID", `NSE${employee.employeeId}`],
            ["Name", `${employee.firstName} ${employee.lastName}`],
            ["Email", employee.email],
            ["DOB", employee.dob],
            ["Join Date", employee.joinDate],
            ["Department", employee.department],
            ["Position", employee.position],
            ["Contact", employee.contact],
            ["Emergency Contact", employee.emergencyContact],
          ].map(([title, value], index) => (
            <div
              key={title}
              className={`grid grid-cols-2 gap-14 md:grid-cols-3 md:gap-10 p-3 ${
                index % 2 === 0 ? "even:bg-gray-50" : ""
              } sm:grid-cols-3 sm:gap-4`}
            >
              <dt className="font-medium text-gray-900">{title}:</dt>
              <dd className="text-gray-700 sm:col-span-2">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default EmployeeDetails;
export const runtime = "edge";
