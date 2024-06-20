import "@/app/globals.css";


export const metadata = {
  title: 'Login/Signup',
  description: 'Access dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
