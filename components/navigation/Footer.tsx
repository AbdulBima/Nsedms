import Link from "next/link";

const Footer = () => {
	return (
		<div className='bodyText px-4 pt-16 mx-auto bg-gray-800 sm:max-w-xl md:max-w-full lg:max-w-full md:px-24 lg:px-8'>
			<div className='flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row'>
				<p className='deskPara text-sm text-blue-100'>
					© Copyright 2024 NSEDMS Inc. All rights
					reserved.
				</p>
				<ul className='flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row'>
					<li>
						<Link
							href='/'
							className='text-sm text-blue-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
						>
							F.A.Q
						</Link>
					</li>
					<li>
						<Link
							href='/'
							className='text-sm text-blue-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
						>
							Privacy Policy
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
