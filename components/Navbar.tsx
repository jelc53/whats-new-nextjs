"use client" // this is a client component
import React, {useState} from "react"
import { Link } from "react-scroll/modules"
import { useTheme } from "next-themes"
import { RiMoonFill, RiSunLine } from "react-icons/ri"
import { IoMdMenu, IoMdClose } from "react-icons/io"

interface NavItem {
    label: string
    page: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "[Home]",
        page: "home",
    },
    {
        label: "[About]",
        page: "about",
    },
    {
        label: "[Catalogue]",
        page: "catalogue",
    },
]

export default function Navbar() {
    const {systemTheme, theme, setTheme} = useTheme()
    const currentTheme = theme === "system" ? systemTheme : theme
    const [navbar, setNavbar] = useState(false)

    return (
        <header className="font-mono w-full mx-auto px-10 top-0 z-50 sm:px-10 text-slate-800 bg-white shadow fixed dark:bg-stone-900 dark:text-slate-100 dark:border-b dark:border-stone-600">
            <div className="justify-between md:items-center md:flex">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-4 md:block">
                        <Link to="home">
                            <div className="container flex items-center space-x-2">
                                <h2 className="text-2xl font-bold">What's New?</h2>
                            </div>
                        </Link>

                        {currentTheme === "dark" ? (
                            <div className="md:hidden justify-between flex space-x-5 space-y-0 md:space-y-0">
                                <button 
                                    onClick={() => setNavbar(!navbar)}
                                    className="bg-stone-300 p-2 rounded-xl"
                                    // className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                >
                                    {navbar ? <IoMdClose size={25} color="black"/> : <IoMdMenu size={25} color="black" />}
                                </button>
                                <button 
                                    onClick={() => setTheme("light")}
                                    className="bg-stone-300 p-2 rounded-xl"
                                >
                                    <RiSunLine size={25} color="black" />
                                </button>
                            </div>
                        ) : (
                            <div className="md:hidden justify-between flex space-x-5 space-y-0 md:space-y-0">
                                <button 
                                    onClick={() => setNavbar(!navbar)}
                                    className="bg-slate-100 p-2 rounded-xl"
                                    // className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                >
                                    {navbar ? <IoMdClose size={25} /> : <IoMdMenu size={25} />}
                                </button>
                                <button
                                    onClick={() => setTheme("dark")}
                                    className="bg-slate-100 p-2 rounded-xl"
                                >
                                    <RiMoonFill size={25} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div 
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <div className="items-center justify-center md:flex md:space-x-10 space-y-8 md:space-y-0">
                            {NAV_ITEMS.map((item, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        to={item.page}
                                        className={
                                            "block lg:inline-block text-slate-800 hover:text-slate-500 dark:text-slate-100"
                                        }
                                        activeClass="active"
                                        spy={true}
                                        smooth={true}
                                        offset={-100}
                                        duration={500}
                                        onClick={() => setNavbar(!navbar)}
                                        >{item.label}
                                    </Link>
                                )
                            })}
                            {!navbar ? (
                                currentTheme === "dark" ? (
                                    <button 
                                        onClick={() => setTheme("light")}
                                        className="bg-stone-200 p-2 rounded-xl"
                                    >
                                        <RiSunLine size={20} color="black" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setTheme("dark")}
                                        className="bg-slate-100 p-2 rounded-xl"
                                    >
                                        <RiMoonFill size={20} />
                                    </button>
                                )
                            ) : ("")}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};
