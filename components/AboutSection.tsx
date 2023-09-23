import React from "react"
// import ContactForm from '@/components/ContactForm';

const AboutSection = () => {
    return (
        <section id="about">
            <div className="pt-10 md:pt-12">
                <h1 className="pt-2 font-mono text-2xl font-bold text-center light:text-slate-800 lg:text-left lg:text-3xl">
                    About us
                    <hr className="lg:h-0 w-1/5 mx-auto mt-2 bg-gray-300 border-0 rounded h-[1px]"></hr>
                </h1>
                <div className="grid justify-center grid-cols-1 gap-10 py-4 align-top lg:gap-20 lg: md:grid-cols-2 lg:grid-cols-3 item-stretch">
                    <div className="">
                        <h1 className="justify-center font-mono text-2xl text-center lg:text-3xl">Who we are.</h1>
                        <div>
                        <p className="pt-4 text-lg lg:text-xl">
                            <span className="text-fuchsia-700 dark:text-fuchsia-300">What's New </span>
                            is a wiki for short-form, visual summaries ("sketches") of academic publications.
                        </p> 
                        <br />
                        <p>
                            The project was started by a group of Stanford ICME students and alumni in 2023.
                            <span className="text-gray-500"> [insert more text here insert more text here insert more text here]</span>
                        </p>
                        <br />
                        <p>
                            While studying, we had our fingers on the pulse of the rapidly changing statistics and applied math fields of study.
                            However, as we leave academia or begin to specialize, we will naturally lose some of that pulse. 
                            <span className="text-fuchsia-700 dark:text-fuchsia-300"> What's New </span> is our attempt to stay connected and up-to-date.                                    
                        </p>
                        </div>

                    </div>
                    <div className="">
                        <h1 className="justify-center font-mono text-2xl text-center lg:text-3xl">How to contribute?</h1>
                        <p className="pt-4 text-lg lg:text-xl">
                            To be sustainable, we need to balance producing a great product and process 
                            with not being overly burdensome to maintain.
                        </p>
                        <p>
                            Two primary ways to contribute:
                                <ul className="pl-6 list-disc list-inside">
                                    <br />
                                    <li><span className="text-indigo-600 dark:text-indigo-300">"Academic":</span> Identify which new publications (out of 1000's submitted every year) actually matter! This is most likely a job for Current PhD students or PostDocs actively involved in research.</li>
                                    <br />
                                    <li><span className="text-amber-600 dark:text-amber-300">"Workerbee":</span> Summarize core ideas and innovations from selected top publications! This is most likely a job for graduated students working in industry. The challenge is to produce content that is easily digestable (think visual) for other members.</li>
                                </ul>
                        </p>
                    </div>
                    <div>
                        <h1 className="justify-center font-mono text-2xl text-center lg:text-3xl">Get in touch!</h1>
                        <p className="pt-4 text-lg lg:text-xl">
                        This is very much an experiment and we are always open to new ideas! 
                        Please send us a note if you'd like to get involved in a different way.
                        <br />
                        <br />
                        <span className="text-gray-500">[WIP: WEB3 CONTACT FORM]</span>
                        </p>
                        {/* <ContactForm /> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
