"use client" // this is a client component
import React from "react"

const FooterSection = () => {
    return (
        <footer>
          <div className="w-full px-8 py-2 mx-auto font-mono text-center bg-white md:text-left dark:bg-stone-900 dark:text-slate-100">
            {/* <br /> */}
            <h3 className="lg:text-lg">© 2023 Developed by Stanford ICME Alumni</h3>
          </div>
        </footer>
    )
}

export default FooterSection
