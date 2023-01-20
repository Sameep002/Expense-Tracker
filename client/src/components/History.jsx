import axios from 'axios';
import React from 'react'
import { AiFillDelete } from 'react-icons/ai';

const History = ({dataitems}) => {

    const removeitem = async(id)=>{
        const delitem = await axios.post('/delete_transaction',{id:id})
        alert(delitem.data.msg);
    }
    return (
        <>
            <div className="flex flex-col overflow-auto w-full h-screen overflow-y-auto">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 ">
                    <div className="inline-block min-w-full ">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-xs sm:text-base ">
                                <thead className="bg-gray-200 text-center sm:text-left">
                                    <tr>
                                        <th scope="col" className=" font-medium text-gray-900 px-1 sm:px-6 py-2 sm:py-4 ">
                                            Description
                                        </th>
                                        <th scope="col" className=" font-medium text-gray-900 px-1 sm:px-6 py-2 sm:py-4 ">
                                            Type
                                        </th>
                                        <th scope="col" className=" font-medium text-gray-900 px-1 sm:px-6 py-2 sm:py-4 ">
                                            Amount
                                        </th>
                                        <th scope="col" className="hidden sm:block font-medium text-gray-900 px-6 py-4 ">
                                            Date
                                        </th>
                                        <th scope="col" className=" font-medium text-gray-900 px-1 sm:px-6 py-2 sm:py-4 ">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {
                                        dataitems.map((element) => {
                                            return (
                                                <tr key={element._id} className="bg-white text-center sm:text-left border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td> */}
                                                    <td className=" text-gray-900 font-light px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                                        {element.description}
                                                    </td>
                                                    <td className=" text-gray-900 font-light px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                                        {element.type}
                                                    </td>
                                                    <td className=" text-gray-900 font-light px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                                        {element.amount}
                                                    </td>
                                                    <td className="hidden sm:block text-gray-900 font-light px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                                        {element.date}
                                                    </td>
                                                    <td className=" text-gray-900 font-light px-1 sm:px-6 py-2 sm:py-4 whitespace-nowrap ">
                                                        <button onClick={()=>removeitem(element._id)} ><AiFillDelete /></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default History