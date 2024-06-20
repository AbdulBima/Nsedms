"use client";
import React, { useState } from "react";
import { z, ZodError } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTokenVerification from "../../../components/hooks/useTokenVerification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
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

const AddEmployee: React.FC = () => {
  const { admin, error, isLoading } = useTokenVerification();
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    joinDate: "",
    department: "",
    position: "",
    contact: "",
    emergencyContact: "",
  });

  const schema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    dob: z.string(),
    joinDate: z.string(),
    department: z.string(),
    position: z.string(),
    contact: z
      .string()
      .min(10, "Contact number must be at least 10 characters long")
      .max(15, "Contact number cannot exceed 15 characters"),
    emergencyContact: z.string(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddLoading(true);

    try {
      const validatedData = schema.parse(formData);
      const response = await axios.post(
        "https://nsedms-backend.onrender.com/api/employee/addEmployee",
        validatedData
      );

      toast.success(`Employee added with ID: NGE${response.data.employeeId}`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        joinDate: "",
        department: "",
        position: "",
        contact: "",
        emergencyContact: "",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
      } else {
        console.error("An error occurred:", error);
      }
    }
    setIsAddLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name: keyof FormData, date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  return (
    <>
      {admin && (
        <div className="w-full mt-14 pb-20 p-6 md:mt-8 mx-auto bg-white dark:bg-gray-800">
          <h5 className="bodytext text-gray-800 text-2xl md:text-5xl text-center">
            Register a new employee
          </h5>

          <form className="bodyText mt-12 md:mt-16 md:px-80" onSubmit={handleSubmit}>
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "text" },
              { label: "Department/Ministry", name: "department", type: "text" },
              { label: "Position/Title", name: "position", type: "text" },
              { label: "Contact No.", name: "contact", type: "text" },
              { label: "Emergency Contact", name: "emergencyContact", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="mt-5">
                <label htmlFor={name} className="block text-sm text-gray-800 dark:text-gray-200">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            ))}

            <div className="mt-5">
              <label htmlFor="dob" className="block text-sm text-gray-800 dark:text-gray-200">
                DOB (DD/MM/YYYY)
              </label>
              <DatePicker
                selected={formData.dob ? new Date(formData.dob) : null}
                onChange={(date) => handleDateChange("dob", date)}
                dateFormat="dd/MM/yyyy"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="joinDate" className="block text-sm text-gray-800 dark:text-gray-200">
                Joining Date (DD/MM/YYYY)
              </label>
              <DatePicker
                selected={formData.joinDate ? new Date(formData.joinDate) : null}
                onChange={(date) => handleDateChange("joinDate", date)}
                dateFormat="dd/MM/yyyy"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-14">
              {isAddLoading ? (
                <div className="cube-loader">
                  <div className="cube cube1"></div>
                  <div className="cube cube2"></div>
                  <div className="cube cube3"></div>
                  <div className="cube cube4"></div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bodyText w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="mt-40">
        {isLoading && (
          <div className="cube-loader">
            <div className="cube cube1"></div>
            <div className="cube cube2"></div>
            <div className="cube cube3"></div>
            <div className="cube cube4"></div>
          </div>
        )}
      </div>

      {!isLoading && !admin && (
        <div className="text-center mt-8">
          <p className="text-red-500">You are not authorized to access this page.</p>
        </div>
      )}

      <ToastContainer
        position="top-left"
        autoClose={5000}
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

export default AddEmployee;

export const runtime = 'edge';
