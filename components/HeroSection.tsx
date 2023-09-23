"use client" 
import React from "react"
import { Link } from "react-scroll/modules"
import { HiArrowDown } from "react-icons/hi"

const HeroSection = () => {
    return (
        <section id="home">
            <div 
                className="bg-bayarea-skyline-crop h-[600px] lg:h-[965px] relative overflow-hidden rounded-lg bg-cover bg-no-repeat text-center"
            >
                <div
                    className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed"
                    style={{backgroundColor: 'stone-100'}}
                >
                    <div className="flex items-center justify-center h-full">
                        <div className="pb-24 text-fuchsia-800">
                            <h4 className="mb-3 text-2xl font-semibold lg:text-6xl md:text-4xl">Welcome to our humble</h4>
                            <h2 className="mb-12 text-4xl font-semibold lg:mb-16 lg:text-8xl md:text-6xl">wiki for <span className="italic font-extrabold text-purple-800">publications</span></h2>
                            
                            {/* <button
                            type="button"
                            className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Call to action
                            </button> */}
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 flex flex-row justify-center bottom-14">
                    <Link
                        to="featured"
                        activeClass="active"
                        spy={true}
                        smooth={true}
                        offset={-60}
                        duration={500}
                    >
                        <HiArrowDown size={40} color="white" className="animate-bounce" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
