"use client" 
import React from "react"
import Image from "next/image"

const HeroSection = () => {
    return (
        <section id="home">
            <div 
                className="bg-bayarea-skyline h-[600px] lg:h-[965px] relative overflow-hidden rounded-lg bg-cover bg-no-repeat text-center"
            >
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{backgroundColor: 'stone-100'}}
                >
                    <div className="flex h-full items-center justify-center">
                        <div className="text-fuchsia-800 pb-24">
                            <h4 className="mb-3 lg:text-6xl md:text-4xl text-2xl font-semibold">Welcome to our humble</h4>
                            <h2 className="mb-12 lg:mb-16 lg:text-8xl md:text-6xl text-4xl font-semibold">wiki for publications</h2>
                            
                            <button
                            type="button"
                            className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Call to action
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
