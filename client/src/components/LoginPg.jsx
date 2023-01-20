import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPg = () => {

    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setloginData({ ...loginData, [name]: value })
    }

    const postLoginData = async (e) => {
        try {
            e.preventDefault();

        // const { email, password} = loginData;
        // console.log(loginData);
        const resp = await axios.post('/postLoginData', loginData)

        localStorage.setItem(
            "user",
            JSON.stringify({ ...resp.data.logdata })
        );
        
        alert(resp.data.msg);
        // console.log(resp.data.logdata);
        navigate('/dashboard');
        } catch (error) {
            alert("Invalid User!!!")
        }
    }
    useEffect(() => {
        if (localStorage.getItem("user")) {
          navigate("/dashboard");
        }
      }, [navigate]);


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="./images/pie-chart.png" alt="logo" />
                        Expense Tracker
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" value={loginData.email} onChange={handleInputs} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" value={loginData.password} onChange={handleInputs} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button type="submit" onClick={postLoginData} className=" w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                            </form>
                            <div className='text-center text-white pb-2'>OR</div>
                            <a href='/register'><button className=" w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button></a>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPg