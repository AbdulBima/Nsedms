"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SiteMenuProps {
	closeMenu: () => void; // Prop to close the menu
}

const GeneralSiteMenu: React.FC<SiteMenuProps> = ({ closeMenu }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [menuItems, setMenuItems] = useState<{ link: string; label: string }[]>([]);
	const token = window.localStorage.getItem("token");

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				const items = await getMenuItems(token);
				setMenuItems(items);
			} catch (error) {
				console.error("Error fetching menu items:", error);
			}
		};

		fetchMenuItems();
	}, [token]);

	const handleLogout = () => {
		window.localStorage.removeItem("token");
		router.push("/");
		closeMenu();
	};

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { y: "100%" },
		show: { y: "0%", transition: { duration: 0.4 } },
	};

	return (
		<div className='fixed bg-gray-700 h-[75vh] w-[100vw] border-b border-opacity-20 shadow-md orange-950 z-40 overflow-hidden'>
			<motion.ul className='fixed bodyText space-y-1 mx-auto px-5 pt-20' aria-label='Sidebar' variants={container} initial='hidden' animate='show'>
				{menuItems.map((menuItem, index) => (
					<div className='overflow-hidden z-40' key={index}>
						<motion.li variants={item} className='bodyText text-gray-400 text-bold flex border-b border-white border-opacity-10 items-center px-3 py-2'>
							<Link href={menuItem.link}>
								<span className={cn("truncate text-xl", pathname === menuItem.link ? "text-white" : "")} onClick={closeMenu}>
									{menuItem.label}
								</span>
							</Link>
						</motion.li>
					</div>
				))}
				{token ? (
					<motion.li variants={item} className='bodyText text-gray-400 text-bold flex border-b border-white border-opacity-10 items-center px-3 py-2'>
						<button onClick={handleLogout} className='truncate text-xl text-gray-400'>
							Logout
						</button>
					</motion.li>
				) : (
					<motion.li variants={item} className='bodyText text-gray-400 text-bold flex border-b border-white border-opacity-10 items-center px-3 py-2'>
						<Link href='/login' className='truncate text-xl text-gray-400'>
							Staff Login
						</Link>
					</motion.li>
				)}
			</motion.ul>
		</div>
	);
};

// Function to fetch menu items based on authentication status
const getMenuItems = async (token: string | null): Promise<{ link: string; label: string }[]> => {
	let items: { link: string; label: string }[] = [];
	// Fetch menu items from API based on authentication status
	if (token) {
		items = [
			{ link: "/", label: "Home" },
			{ link: "/dashboard", label: "Dashboard" },
			{ link: "/executive", label: "Executive" },
			{ link: "/minisPar", label: "Ministries/Parastatals" },
			{ link: "/judiciary", label: "Judiciary" },
			{ link: "/legistelative", label: "Legistelative" },
			{ link: "/about", label: "About" },
		];
	} else {
		items = [
			{ link: "/", label: "Home" },
			{ link: "/executive", label: "Executive" },
			{ link: "/minisPar", label: "Ministries/Parastatals" },
			{ link: "/judiciary", label: "Judiciary" },
			{ link: "/legistelative", label: "Legistelative" },
			{ link: "/about", label: "About" },
		];
	}
	return items;
};

export default GeneralSiteMenu;
