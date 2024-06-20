"use client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserTie,
  faBuilding,
  faGavel,
  faLandmark,
  faInfoCircle,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const PublicNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const navItems = [
    { href: "/", label: "Home", icon: faHome },
    { href: "/executive", label: "Executive", icon: faUserTie },
    { href: "/ministries", label: "Ministries", icon: faBuilding },
    { href: "/judiciary", label: "Judiciary", icon: faGavel },
    { href: "/legislative", label: "Legislative", icon: faLandmark },
    { href: "/about", label: "About", icon: faInfoCircle },
  ];

  return (
    <div className="bodyText min-h-screen w-screen bg-gray-50">
      <div className="absolute left-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white">
        <h1 className="mt-10 ml-10 text-3xl font-bold">NSEDMS</h1>
        <ul className="mt-10 space-y-3">
          {navItems.map(({ href, label, icon }) => (
            <li
              key={href}
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 ${
                pathname === href ? "bg-slate-500" : "hover:bg-slate-600"
              }`}
            >
              <Link href={href} className="bodyText flex flex-row space-x-4">
                <span>
                  <FontAwesomeIcon icon={icon} className="h-6 w-6" />
                </span>
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {!isLoading && (
          <button
            onClick={isLoggedIn ? handleLogout : handleLogin}
            className="-ml-20 mt-12 font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
          >
            <FontAwesomeIcon
              icon={isLoggedIn ? faSignOutAlt : faSignInAlt}
              className="mr-2"
            />
            {isLoggedIn ? "Logout" : "Staff Login"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PublicNav;
