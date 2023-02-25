/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);

  const { scrollY } = useScroll();

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  const variants = {
    /** this is the "visible" key and it's respective style object **/
    visible: { opacity: 1, y: 0 },
    /** this is the "hidden" key and it's respective style object **/
    hidden: { opacity: 0, y: -25 },
  };

  useEffect(() => {
    return scrollY.onChange(() => update());
  }, [scrollY, update]);

  return (
    <motion.div
      variants={variants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      className="h-[100px] px-[50px] bg-[#F2C270] text-black flex items-center justify-between fixed z-[999] top-0 w-full"
    >
      <div className="w-max flex-[1] flex gap-5 items-center">
        <div className="flex flex-col">
          <Link href="/" passHref>
            <AiOutlineHome size={30} />
            <p className="text-[14px] font-[500]">Home</p>
          </Link>
        </div>
        <div className="hidden md:block rounded-full p-[10px] border-[2px] border-red-500">
          <Image src="/img/telephone.png" alt="" width={32} height={32} />
        </div>
        <div className="text-black">
          <div className="w-max text-[12px] font-[500] hidden lg:block">
            ORDER NOW!
          </div>
          <div className="w-max text-[20px] font-[700] hidden lg:block">
            012 123 583
          </div>
        </div>
      </div>
      <div className="md:flex-[3] flex items-center justify-center">
        <ul className="flex items-center justify-center">
          <Image src="/img/logo.png" alt="" width={169} height={59} />
        </ul>
      </div>
      <Link
        href={`/cart`}
        passHref
        className="flex-[1] flex items-center justify-end"
      >
        <div>
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
