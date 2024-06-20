"use client"


import React, { useState, useEffect } from "react";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import { approveLeaveRequest,  fetchLeaveRequests } from "@/components/LeaveApiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface LeaveRequest {
  _id: string;
  createdBy: string;
  TypeOfLeave: string;
  startdate: string;
  enddate: string;
  totalnumberofdays: string;
  reasonforleave: string;
  status: boolean;
}

const LeaveApproval: React.FC = () => {
  const { admin, staffId, isLoading } = useTokenVerification();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaveRequests();
        const filteredLeaveRequests = data.filter((request: LeaveRequest) => !request.status);
        setLeaveRequests(filteredLeaveRequests);
				
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

	const handleApprove = async (leaveId: string) => {
		try {
			if (!staffId) {
				console.error("Staff ID is null.");
				return;
			}
			
			await approveLeaveRequest(leaveId, staffId);
			toast.success(
				`leave request approved.`,
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
			const data = await fetchLeaveRequests();
			const filteredLeaveRequests = data.filter((request: LeaveRequest) => !request.status);
			setLeaveRequests(filteredLeaveRequests);
		} catch (error) {
			console.error("Error approving leave:", error);
		}
	};
	

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg">
          Unauthorized admin access, Please:&nbsp;{" "}
          <Link href="/login" className="text-red-400 underline-offset-4">
            login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <h5 className="bodyText mt-24 md:mt-16 text-gray-800 text-2xl font-bold md:text-5xl text-center">
        Leave Approvals
      </h5>

      <div className=" w-full overflow-x-auto overflow-y-auto md:overflow-x-hidden py-10 md:py-20 mx-auto px-20 md:px-44">
        <table className="bodyText bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Employee Id
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
  {leaveRequests.map((request, index) => (
    <tr key={index} className="text-black even:bg-blue-50">
      <td className="px-6 py-4 text-sm">NSE{request.createdBy}</td>
      <td className="px-6 py-4 text-sm">{request.TypeOfLeave}</td>
      <td className="px-6 py-4 text-sm">{request.startdate}</td>
      <td className="px-6 py-4 text-sm">{request.enddate}</td>
      <td className="px-6 py-4 text-sm">
        {!request.status && (
          <><button
            className="bodyText px-6 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            onClick={() => {
              handleApprove(request._id);
            } }
          >
            Approve
          </button><button
            className="bodyText ml-6 px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                >
              Deny
            </button></>
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>
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

export default LeaveApproval;
export const runtime = 'edge';