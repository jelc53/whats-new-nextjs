import React from "react"
import CatalogueTable from "./CatalogueTable"

const CatalogueSection = () => {
    return (
        <section id="catalogue">
            <div className="pt-10 md:pt-12">
                <h1 className="pt-2 font-mono text-2xl font-bold text-center light:text-slate-800 lg:text-left lg:text-3xl">
                    Catalogue <span className="hidden lg:inline-block">--&gt;</span>
                    <hr className="lg:h-0 w-1/5 mx-auto mt-2 bg-gray-300 border-0 rounded h-[1px]"></hr>
                </h1>
                {/* <CatalogueTable /> */}
            </div>
        </section>
    )
}

export default CatalogueSection