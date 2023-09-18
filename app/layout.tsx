export const metadata = {
  title: "What's New",
  description: "Draft web app for academic publications wiki",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const header = (
    <header>
      <div>
        <h1>
          <span>Welcome to our humble </span>
          wiki for <span>publications</span>
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
      <body>
        {header}
        {children}
        {footer}
        </body>
    </html>
  )
}
