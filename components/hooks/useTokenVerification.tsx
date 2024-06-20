"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TokenVerificationResult {
  staffId: string | null;
  employee_ID: string | null;
  admin: boolean;
  error: string | null;
  isLoading: boolean;
}

function useTokenVerification(): TokenVerificationResult {
  const [verificationResult, setVerificationResult] =
    useState<TokenVerificationResult>({
      staffId: null,
      employee_ID: null,
      admin: false,
      error: null,
      isLoading: true,
    });

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const response = await axios.get<any>(
          "https://backendv2-smz4.onrender.com/api/employeeTKNroute/verifyToken",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setVerificationResult({
          staffId: response.data.staffId,
          employee_ID: response.data.employeeId,
          admin: response.data.admin,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error verifying token:", error);

        // Remove the token from local storage if verification fails
        localStorage.removeItem("token");

        setVerificationResult({
          staffId: null,
          employee_ID: null,
          admin: false,
          error: "Error occurred while verifying token",
          isLoading: false,
        });
        router.push("/");
      }
    };

    const token = localStorage.getItem("token");

    if (token) {
      verifyToken(token);
    } else {
      setVerificationResult({
        staffId: null,
        employee_ID: null,
        admin: false,
        error: "Token not found in localStorage",
        isLoading: false,
      });
      router.push("/");
    }

    // Periodic token verification every 30 minutes
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        verifyToken(token);
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(intervalId);
  }, [router]);

  return verificationResult;
}

export default useTokenVerification;
