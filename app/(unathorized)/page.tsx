"use client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faGavel,
  faLandmark,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        const response = await axios.get(
          "https://nsedms-backend.onrender.com/api/employee/totalEmployees"
        );
        setTotalEmployees(response.data.totalEmployees);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching total employees:", error);
      }
    };

    fetchTotalEmployees();
  }, []);

  return (
    <div className="w-full md:h-full mb-20 mt-10 md:my-0 md:px-24 overscroll-hidden mx-auto bg-white flex items-center justify-center">
      <div className="z-10 mx-auto w-full px-6 py-6 md:px-10">
        <div className="mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 font-bold gap-4">
          <div className="w-full px-2">
            <Link href="/executive">
              <div className="h-full w-full hover:transform-gpu hover:scale-95 cursor-pointer bg-yellow-400 p-6">
                <div className="z-10 flex flex-col justify-between">
                  <h6 className="text-2xl md:text-4xl font-bold bodyText text-blue-900 flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUserTie} />
                    <span>Executive</span>
                  </h6>

                  {isLoading ? (
                    <div className="loaderR">
                      <div className="bar1"></div>
                      <div className="bar2"></div>
                      <div className="bar3"></div>
                      <div className="bar4"></div>
                      <div className="bar5"></div>
                      <div className="bar6"></div>
                      <div className="bar7"></div>
                      <div className="bar8"></div>
                      <div className="bar9"></div>
                      <div className="bar10"></div>
                      <div className="bar11"></div>
                      <div className="bar12"></div>
                    </div>
                  ) : (
                    <h1 className="text-lg md:text-3xl mt-6 bodyText text-blue-900">
                      {totalEmployees} - Employees
                    </h1>
                  )}

                  <h1 className="text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-blue-700 bodyText text-blue-900">
                    view
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full px-2">
            <Link href="/ministries">
              <div className="h-full w-full hover:transform-gpu hover:scale-95 cursor-pointer bg-indigo-600 p-6">
                <div className="z-10 flex flex-col justify-between">
                  <h6 className="md:hidden text-2xl md:text-4xl font-bold bodyText text-white flex items-center space-x-2">
                    <FontAwesomeIcon icon={faBuilding} />
                    <span>Ministries</span>
                  </h6>
                  <h6 className="hidden md:flex text-2xl md:text-3xl font-bold bodyText text-white flex items-center space-x-2">
                    <FontAwesomeIcon icon={faBuilding} />
                    <span>Ministries</span>
                  </h6>

                  <h1 className="text-lg md:text-3xl mt-6 bodyText text-white">
                    6,423 - Employees
                  </h1>

                  <h1 className="text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-white bodyText text-white">
                    view
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full px-2">
            <Link href="/judiciary">
              <div className="h-full w-full hover:transform-gpu hover:scale-95 cursor-pointer bg-blue-400 p-6">
                <div className="z-10 flex flex-col justify-between">
                  <h6 className="text-2xl md:text-4xl font-bold bodyText text-white flex items-center space-x-2">
                    <FontAwesomeIcon icon={faGavel} />
                    <span>Judiciary</span>
                  </h6>

                  <h1 className="text-lg md:text-3xl mt-6 bodyText text-white">
                    1,134 - Employees
                  </h1>

                  <h1 className="text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-white bodyText text-white">
                    view
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full px-2">
            <Link href="/legislative">
              <div className="h-full w-full hover:transform-gpu hover:scale-95 cursor-pointer bg-red-200 p-6">
                <div className="z-10 flex flex-col justify-between">
                  <h6 className="text-2xl md:text-3xl font-bold bodyText text-blue-900 flex items-center space-x-2">
                    <FontAwesomeIcon icon={faLandmark} />
                    <span>Legislative</span>
                  </h6>

                  <h1 className="text-lg md:text-3xl mt-6 bodyText text-blue-900">
                    1,201 - Employees
                  </h1>

                  <h1 className="text-xl mt-10 md:mt-14 md:uppercase underline-offset-4 decoration-2 hover:scale-105 underline decoration-blue-700 bodyText text-blue-900">
                    view
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
