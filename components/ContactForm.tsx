import React from "react"

const ContactForm = () => {
  return (
    <form className="w-full max-w-lg">
      {/* <div className="flex flex-wrap mb-6 -mx-3">
        <div className="w-full px-3">
          <label className="block mb-2 text-sm font-bold tracking-wide text-gray-700 uppercase"> 
            Name
          </label>
          <input className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" placeholder="jean-baptiste"/>
        </div>
      </div> */}
      <div className="flex flex-row mb-2">
        <div className="w-full">
          <label className="inline-block w-1/3 mb-2 font-bold tracking-wide text-gray-700 uppercase dark:text-gray-200 w-1/" >
            E-mail
          </label>
          <input className="inline-block w-2/3 px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="jb@gmail.com"/>
          {/* <p className="text-xs italic text-gray-600">Some tips - as long as needed</p> */}
        </div>
      </div>
      <div className="flex flex-row mb-2">
        <div className="w-full">
          <label className="inline-block w-1/3 mb-2 font-bold tracking-wide text-gray-700 uppercase dark:text-gray-200 " >
            Subject
          </label>
          <input className="inline-block w-2/3 px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="subject" type="text" placeholder="sketch proposal"/>
          {/* <p className="text-xs italic text-gray-600">Some tips - as long as needed</p> */}
        </div>
      </div>
      <div className="flex flex-wrap mb-2 -mx-3">
        <div className="w-full px-3">
          {/* <label className="block mb-2 text-sm font-bold tracking-wide text-gray-700 uppercase" >
            Message
          </label> */}
          <textarea className="block w-full h-56 px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none resize-none no-resize focus:outline-none focus:bg-white focus:border-gray-500" id="message" placeholder="text text text"></textarea>
          <p className="text-xs italic text-gray-600 dark:text-gray-300 ">Please allow us a few days to respond. After all, this site doesn't pay the bills :) </p>
        </div>
      </div>
      <div className="pt-2 md:flex md:items-center">
        <div className="md:w-1/3">
          <button className="px-4 py-2 font-bold text-white rounded shadow dark:text-slate-800 bg-slate-800 hover:bg-slate-600 dark:bg-slate-300 focus:shadow-outline focus:outline-none" type="button">
            Send
          </button>
        </div>
        <div className="md:w-2/3"></div>
      </div>
  </form>
  )
};

export default ContactForm;
