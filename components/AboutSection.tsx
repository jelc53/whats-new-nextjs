import React from "react"
import Link from "next/link"
import ContactForm from '@/components/ContactForm';

const AboutSection = () => {
    return (
        <section id="about">
            <div className="pt-10 md:pt-12">
                <h1 className="pt-2 font-mono text-2xl font-bold text-center light:text-slate-800 lg:text-left lg:text-3xl">
                    About us <span className="hidden lg:inline-block">--&gt;</span>
                    <hr className="lg:h-0 w-1/5 mx-auto mt-2 bg-gray-300 border-0 rounded h-[1px]"></hr>
                </h1>
                <div className="grid justify-center grid-cols-1 gap-10 py-4 align-top lg:gap-10 md:grid-cols-2 lg:grid-cols-3 item-stretch">
                    <div className="p-4 border rounded-lg">
                        <h1 className="justify-center font-mono text-2xl text-center lg:text-3xl">Who we are.</h1>
                        <div>
                            <p className="pt-4 text-lg lg:text-xl">
                                <span className="text-fuchsia-700 dark:text-fuchsia-300">What's New </span>
                                is a wiki for short-form, visual summaries ("sketches") of academic publications.
                            </p> 
                            <br />
                            <p>
                                The project was started by a group of students with too much time on their hands in 2023 
                                and a shared love of purple color schemes*. 
                            </p>
                            <br />
                            <p>
                                While studying, we felt (maybe for the first time) that we had our finger on the pulse of this wierd, wonderful and rapidly changing world of applied math.
                                We would read a new publication and know straight away if it was game-changing or just noise.
                                However, as we leave academia or begin to specialize, we will naturally lose some of that pulse. 
                                <span className="text-fuchsia-700 dark:text-fuchsia-300"> What's New </span> is our attempt to stay connected and up-to-date.                                    
                            </p>
                            <br />
                            <br />
                            <p className="pt-4 text-base italic lg:text-lg">
                                *See <Link href="https://helix-editor.com/">Helix's</Link> post-modern text editor for a best-in-class example (not a paid ad ...).
                            </p>
                        </div>

                    </div>
                    <div className="p-4 border rounded-lg">
                        <h1 className="justify-center font-mono text-2xl text-center lg:text-3xl">How to contribute?</h1>
                        <p className="pt-4 text-lg lg:text-xl">
                            To be sustainable, we need to balance producing a great product with not being overly burdensome for part-time contributors to maintain. 
                        </p>
                        <br />
                        <p> We have two types of contributors: </p>
                        <br />
                        <ul className="pl-6 list-disc list-inside">
                            <li><span className="text-indigo-600 dark:text-indigo-300"><span className="font-bold">"Academic":</span> Identify the 3-5 publications that actually matter from your field of study!</span> We might also ask academics to review draft sketches. This is most likely a job for Current PhD students or PostDocs actively involved in research.</li>
                            <br />
                            <li><span className="text-teal-600 dark:text-teal-300"><span className="font-bold">"Workerbee":</span> Write 1-2 sketches that beautifully summarize the core ideas from selected publications!</span> This is most likely a job for graduated students working in industry. The challenge is to produce content that is easily digestable (think visual) for other members.</li>
                        </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h1 className="justify-center font-mono text-2xl text-center lg:text-3xl">Get in touch!</h1>
                        <p className="pt-4 text-lg lg:text-xl">
                            This is very much an experiment and we are always open to new ideas! 
                            Please send us a note if you'd like to get involved.
                            <br />
                            <br />
                        </p>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
