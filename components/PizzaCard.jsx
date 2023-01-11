import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function PizzaCard({ pizza }) {
  return (
    <div
      className="md:h-[400px] mt-20 md:w-[22%] p-[10px] flex flex-col
    items-center justify-center py-[20px] px-[40px] cursor-pointer"
    >
      <Link href={`/product/${pizza._id}`} passHref className='md:w-[200px] md:h-[200px]'>
        <Image src={pizza.img} alt="" width={500} height={500} />
      </Link>
      <h1 className="text-[18px] font-bold text-[#d1411e]">{pizza.title}</h1>
      <p>${pizza.prices[0]}</p>
      <p className="text-center text-[#777]"> {pizza.desc}</p>
    </div>
  );
}
