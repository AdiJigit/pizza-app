import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { GiFullPizza } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

export default function Product({ pizza }) {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({...pizza, extras, price, quantity}));
  };

  return (
    <div className="product flex flex-col md:flex-row">
      <div className="md:flex-1 h-[100%] flex items-center justify-center">
        <div className="w-[80%] h-[80%] relative">
          <Image
            src={pizza.img}
            alt=""
            width={500}
            height={500}
            className="object-contain "
          />
        </div>
      </div>
      <div className="md:flex-1 p-[20px]">
        <h1 className="mt-10 text-3xl font-bold mb-4">{pizza.title}</h1>
        <p className="mb-4 text-[#d1411e] text-[24px] font-[400] border-b w-max border-b-[#d1411e]">
          Price - ${price}
        </p>
        <p className="mb-4">{pizza.desc}</p>
        <h3 className="text-[18px] font-bold">Choose the size</h3>
        <div className="mt-4 flex gap-20 cursor-pointer">
          <div
            className="w-[30px] h-[30px] relative"
            onClick={() => handleSize(0)}
          >
            <GiFullPizza size={40} className="text-red-500" />
            <span className="italic absolute top-[-5px] right-[-30px] bg-teal-600 text-white text-sm px-[5px] rounded-[10px]">
              Small
            </span>
          </div>
          <div
            className="w-[40px] h-[40px] relative"
            onClick={() => handleSize(1)}
          >
            <GiFullPizza size={50} className="text-red-500" />
            <span className="italic absolute top-[-5px] right-[-40px] bg-teal-600 text-white text-sm px-[5px] rounded-[10px]">
              Medium
            </span>
          </div>
          <div
            className="w-[50px] h-[50px] relative"
            onClick={() => handleSize(2)}
          >
            <GiFullPizza size={60} className="text-red-500" />
            <span className="italic absolute top-[-5px] right-[-20px] bg-teal-600 text-white text-sm px-[5px] rounded-[10px]">
              Large
            </span>
          </div>
        </div>
        <h3 className="mt-10 font-bold text-lg">
          Choose additional ingredients
        </h3>
        <div className="mt-4 italic">
          {pizza.extraOptions.map((option) => (
            <div className="flex gap-2" key={option._id}>
              <input
                type="checkbox"
                name={option.text}
                id={option.text}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-10">
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className="w-[50px] h-[30px] outline-none border border-red-500 p-2 rounded"
          />
          <button
            onClick={handleClick}
            className="bg-red-500 p-2 px-5 rounded text-white font-[500] hover:scale-[1.02] duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};
