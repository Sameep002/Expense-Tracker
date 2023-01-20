import React from 'react'
import { useState, useEffect } from 'react'
import History from './History'
import axios from 'axios'
import { AiFillDelete } from 'react-icons/ai';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);



const Calc = () => {

  const [entry,setentry] = useState({
      logid:"",
      description:"",
      type:"",
      amount:"",
      date:""
    })
  const [api,setapi] = useState([])
  const [savings , setSavings] = useState();
  const [expense , setExpense] = useState();
  const [loginUser, setLoginUser] = useState("");
  // let user;
  // useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     setLoginUser(user);
  //   }
  //   console.log(user)
  // },[user]);

  const getdata =async()=>{
    // console.log(loginUser)
    const adata = await axios.post('/transactions',user);
    setapi(adata.data.msg);
  }
  const getTotal = async()=>{
    const total = await axios.post('/total',user);
    setSavings(total.data.Savings);
    setExpense(total.data.Expense);
  }
  
  useEffect(()=>{
    
    
      getdata();
      getTotal();
  },[api])

  const datasetpie = {
    labels: ['Expense', 'Savings'],
    datasets: [
      {
        label: 'Amount in $',
        data: [expense, savings],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      },
    ],
  };

  let name,value;
  const handleInputs=(e)=>{
    name = e.target.name;
    value = e.target.value;

    const d = new Date();
    var year = d.toLocaleString("default", { year: "numeric" });
    var month = d.toLocaleString("default", { month: "2-digit" });
    var day = d.toLocaleString("default", { day: "2-digit" });
    var date = day + "/" + month + "/" + year;

    setentry({...entry, [name]:value, date:date, logid:user._id})
  }      

  const postData = async(e)=>{
    e.preventDefault();
    const resp = await axios.post('/add_transaction', entry)
    alert(resp.data.msg);
    getdata();
    getTotal();
  }  

  const removeitem = async(id)=>{
    const delitem = await axios.post('/delete_transaction',{id:id})
    alert(delitem.data.msg);
}
  return (
    <>
      <div className='sm:flex'>
      <main className='w-full sm:w-3/5 bg-slate-300 '>
        <section className='pt-8 '>
          {/* <h2 className='text-center text-2xl'>Expense Tracker</h2> */}
          <div className='h-[300px] flex justify-center py-4'>
          <Doughnut data={datasetpie} />
          </div>
          <div className='w-1/2 text-center font-bold text-gray-600 text-base mb:text-lg xl:text-xl mb-2 mx-auto'>Balance : {(savings-expense)>0 ? `$${savings-expense}` : `-$${-(savings-expense)}`}</div>
        </section>
        <section className='w-2/3 mx-auto pb-4 md:p-2 xl:p-4'>
          <div>
            <h3 className='text-lg sm:text-2xl text-center'>Add New Transaction</h3>
          </div>
          <form action='' className='flex flex-col space-y-4'>
            <span className='mt-4 text-sm sm:text-base'>Description</span>
            <input type="text" name='description' placeholder='Enter Transaction Description' value={entry.description} className='text-sm sm:text-base p-2 rounded' onChange={handleInputs}/>
            <span className='text-sm sm:text-base'>Type</span>
            <select name="type" className='text-sm sm:text-base p-2 rounded' value={entry.type} onChange={handleInputs}>
              <option value="null">Select Transaction Type</option>
              <option value="Expense">Expense</option>
              <option value="Savings">Savings</option>
            </select>
            <span className='text-sm sm:text-base'>Amount</span>
            <input type="number" name='amount' placeholder='Enter Amount' className='text-sm sm:text-base p-2 rounded' value={entry.amount} onChange={handleInputs}/>
            <button type="button" className=" text-sm sm:text-base w-3/5 mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded sm:rounded-lg p-1 sm:px-5 sm:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={postData} >Add Transaction</button>
          </form>
        </section>
      </main>
      {/* <div className=''> */}
      {/* <History dataitems={api}/> */}
      {/* </div> */}
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
                                        api.map((element) => {
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
      </div>
    </>
  )
}

export default Calc

// const [entry,setentry] = useState({
//   logid:"",
//   description:"",
//   type:"",
//   amount:"",
//   date:""
// })

// const [api,setapi] = useState([])
// const [savings , setSavings] = useState();
// const [expense , setExpense] = useState();
// // const [user , setuser] = useState({});

// useEffect(() => {

//   const getuser = async()=>{
//     const resp = await axios.get('/dashboard');
//     setuser(resp.data)
//     // console.log(user.logid._id)
//   }
//   getuser();

//   

//   const getTotal = async()=>{
//     const total = await axios.get('/total');
//     // console.log(total)
//     setSavings(total.data.Savings);
//     setExpense(total.data.Expense);
//   }
//   getTotal();
// },[])

// let name,value;
// const handleInputs=(e)=>{
//   name = e.target.name;
//   value = e.target.value;

//   const d = new Date();
//   var year = d.toLocaleString("default", { year: "numeric" });
//   var month = d.toLocaleString("default", { month: "2-digit" });
//   var day = d.toLocaleString("default", { day: "2-digit" });
//   var date = day + "/" + month + "/" + year;

  
//   setentry({...entry, [name]:value, date:date, logid:loginUser._id})
// }

// const postData = async(e)=>{
//   e.preventDefault();

//   const { description, type, amount, date} = entry;
//   // console.log(entry);
  
//   const data = await axios.post('/post', entry)
// }

