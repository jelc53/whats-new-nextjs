"use client" // this is a client component
import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import Navbar from "@/components/Navbar"
import FooterSection from "@/components/FooterSection"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="dark:bg-stone-900">
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  )
}
