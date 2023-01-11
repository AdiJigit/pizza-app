import { useState } from "react"

export default function OrderDetails({ total, createOrder }) {
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')

  const handleClick= () => {
    createOrder({customer, address, total, method: 0})
  }

  return (
    <div className="w-[100%] h-[100vh] fixed z-[999] top-0 left-0 flex justify-center items-center bg-gray-400/20">
      <div className="w-[500px] bg-white rounded-[20px] p-[50px] flex flex-col justify-center items-center">
        <h1 className="font-[300] text-2xl mb-4">You will pay $12 after delivery.</h1>
        <div className="flex flex-col w-[100%] mb-[15px]">
          <label className="mb-[10px]">Name Surname</label>
          <input type="text" placeholder="John Doe" className="h-[40px]" onChange={(e) => setCustomer(e.target.value)} />
        </div>
        <div className="flex flex-col w-[100%] mb-[15px]">
          <label  className="mb-[10px]">Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className='h-[40px]'
          />
        </div>
        <div className="flex flex-col w-[100%] mb-[15px]">
          <label className="mb-[10px]">Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className=''
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="mt-5 p-2 px-8 bg-red-500 rounded text-white font-bold hover:scale-[1.02] duration-300 cursor-pointer" onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  )
}
