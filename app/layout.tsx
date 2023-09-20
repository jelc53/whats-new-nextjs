"use client" // this is a client component
import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import Navbar from "@/components/Navbar"

// export const metadata = {
//   title: "What's New?",
//   description: "Draft web app for academic publications wiki",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const header = (
    <header>
      <div className="text-center h-screen bg-[url('/images/bayarea_skyline.jpg')] bg-no-repeat">
        <h1 className="text-5xl font-bold text-fuchsia-800">
          <span className="text-3xl">Welcome to our humble </span>
          wiki for <span className="stroke-current">publications</span>
        </h1>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div>
        <br />
        <h3>Developed by Stanford ICME alumni, 2023</h3>
      </div>
    </footer>
  )
  return (
    <html lang="en">
      <body className="dark:bg-stone-900">
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          {/* {header} */}
          {children}
          {/* {footer} */}
        </ThemeProvider>
      </body>
    </html>
  )
}
