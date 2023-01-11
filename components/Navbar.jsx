import Image from 'next/image';
import { motion } from 'framer-motion';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai'

export default function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5 }}
      className="h-[100px] px-[50px] bg-[#F2C270] text-black flex items-center justify-between fixed z-[999] top-0 w-full"
    >
      <div className="w-max flex-[1] flex gap-5 items-center"> 
        <div className='flex flex-col'>
          <Link href='/' passHref>
            <AiOutlineHome size={30} />
            <p className='text-[14px] font-[500]'>Home</p>
          </Link>
        </div>
        <div className="hidden md:block rounded-full p-[10px] border-[2px] border-red-500">
          <Image src="/img/telephone.png" alt="" width={32} height={32} />
        </div>
        <div className="text-black">
          <div className="text-[12px] font-[500] hidden lg:block">
            ORDER NOW!
          </div>
          <div className="text-[20px] font-[700] hidden lg:block">
            012 123 583
          </div>
        </div>
      </div>
      <div className="md:flex-[3] flex items-center justify-center">
        <ul className="flex items-center justify-center">
          <Image src="/img/logo.png" alt="" width={169} height={59} />
        </ul>
      </div>
      <Link href={`/cart`} passHref className="flex-[1] flex items-center justify-end">
      <div >
        <div className="relative bg-red-500 rounded-full p-2">
          <AiOutlineShoppingCart
            size={25}
            width={30}
            height={30}
            className="text-white"
          />
          <div className="absolute top-[-10px] right-[-10px] h-[20px] rounded-full bg-blue-500 p-[6px] flex items-center justify-center text-white text-sm font-[500]">
            {quantity}
          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}
