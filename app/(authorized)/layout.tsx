import DashNav from "@/components/mobileCom/DashNav";
import SideNav from "@/components/navigation/SideNav";
import "@/app/globals.css";

export const metadata = {
	title: "Dashboard",
	description: "NSEDMS Staff Dashboard",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<div className='bodyText flex md:flex-row w-screen h-screen'>
					<div className='hidden z-[80] h-full overflow-hidden md:flex w-[20vw] flex-none bg-gray-700'>
						<SideNav />
					</div>
					<main className='h-full overflow-y-auto overflow-x-hidden md:w-[80vw] w-[100vw] bg-white'>
						<DashNav />
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
