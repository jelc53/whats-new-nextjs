"use client" // this is a client component
import React from "react"

const FooterSection = () => {
    return (
        <footer>
          <div className="w-full flex flex-row text-center md:text-left px-6 py-2 mx-auto font-mono bg-white dark:bg-stone-900 dark:text-slate-100">
            {/* <br /> */}
            <h3>© 2023 Developed by Stanford ICME Alumni</h3>
          </div>
        </footer>
    )
}

export default FooterSection
