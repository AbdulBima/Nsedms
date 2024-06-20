"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const DesktopNav = () => {
  const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		setIsLoggedIn(!!token);
    setIsLoading(false); // Set loading to false once token is retrieved
	}, []);

	const handleLogout = () => {
		window.localStorage.removeItem("token");
		setIsLoggedIn(false);
		router.push("/");
	};

	const handleLogin = () => {
		router.push("/login");
	};


	return (
		<div className='hidden md:flex bg-gray-700 bodyText'>
			<div className=' mx-auto lg:py-4  md:max-w-full lg:max-w-screen-xl md:px-10 lg:px-4'>
				<div className='relative flex items-center justify-between lg:justify-center lg:space-x-16'>
				
				
				
					<ul className='md:flex items-center hidden space-x-8 lg:flex'>
				
        
        
              <li>
                <a
                  href='/'
                  aria-label='Home'
                  title='home'
                  className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
                >
                  Home
                </a>
              </li>
          
        
           
						<li>
							<a
								href='/executive'
								aria-label='executive'
								title='executive'
								className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
							>
								Executive
							</a>
						</li>
						<li>
							<a
								href='/executive'
								aria-label='Executive'
								title='Executive'
								className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
							>
								Ministies/Parastatals
							</a>
						</li>
					</ul>
					<a
						href='/'
						aria-label='Home'
						title='Home'
						className='inline-flex text-white font-bold text-4xl items-center'
					>
						NSEDMS
					</a>
					<ul className='md:flex items-center hidden space-x-8 lg:flex'>
						<li>
							<a
								href='/executive'
								aria-label='Judiciary'
								title='Judiciary'
								className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
							>
								Judiciary
							</a>
						</li>
						<li>
							<a
								href='/executive'
								aria-label='Legistelative'
								title='Legistelative'
								className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
							>
								Legistelative
							</a>
						</li>
						<li>
							<a
								href='/about'
								aria-label='About'
								title='About'
								className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
							>
								About
							</a>
						</li>

						<li>
							
              {!isLoading && (isLoggedIn ? (
								<button
									onClick={handleLogout}
									className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
								>
									Logout
								</button>
							) : (
								<button
									onClick={handleLogin}
									className='font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'
								>
									Staff Login
								</button>
							))}
							
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
