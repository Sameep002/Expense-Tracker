import React from 'react'
import Calc from './Calc'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("user");
        alert("Logout Successfully");
        navigate("/");
      };
    return (
        <>
            <nav className=" border-gray-200 bg-blue-700">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Expense Tracker</span>
                    </a>
                    <div className="flex items-center">
                        <button onClick={logoutHandler} className="text-sm sm:text-base font-medium border border-white rounded-md px-2 py-1 sm:px-4 sm:py-2  text-white hover:bg-blue-800">Logout</button>
                    </div>
                </div>
            </nav>
            <Calc/>
        </>
    )
}

export default Navbar