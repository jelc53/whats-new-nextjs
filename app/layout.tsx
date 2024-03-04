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
      <head>
        <script
          type="text/x-mathjax-config"
          dangerouslySetInnerHTML={{
            __html: `
              MathJax.Hub.Config({
                tex2jax: {
                  inlineMath: [ ['$','$'] ],
                  displayMath: [['$$', '$$'], ['\\[', '\\]']],
                  processEscapes: true
                }
              });
            `,
          }}
        />
        <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>
      </head>
      <body className="flex flex-col justify-between h-screen dark:bg-stone-900">
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          {children}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  )
}
