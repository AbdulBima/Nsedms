import type { Metadata } from "next";
import "@/app/globals.css";
import MobileNav from "@/components/navigation/MobileNav";
import Footer from "@/components/navigation/Footer";
import PublicNav from "@/components/navigation/PublicNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";

export const metadata: Metadata = {
  title: "NSEDMS",
  description: "Niger State Employees Database Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='overflow-x-hidden bodyText'>
        <div className='bodyText flex md:flex-row w-screen h-[100vh]'>
          <div className='hidden z-[80] h-[100vh] md:flex w-[20vw] flex-none bg-gray-700'>
            <PublicNav />
          </div>
          <main className='md:mt-0 overflow-y-auto overflow-x-hidden md:w-[80vw] w-[100vw] bg-white'>
            <MobileNav />
            {children}
            <div className="md:hidden">
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
