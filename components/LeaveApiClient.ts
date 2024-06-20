import axios from "axios";

const BASE_URL = "https://backendv2-smz4.onrender.com/api/leave";

export const fetchLeaveRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
};

export const approveLeaveRequest = async (leaveId: string, staffId: string) => {
  try {
    await axios.put(`${BASE_URL}/approve/${leaveId}/${staffId}`);
  } catch (error) {
    console.error("Error approving leave:", error);
    throw error;
  }
};
