import axios from 'axios';
import React, { useState } from 'react';

export default function Add({ setClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads')
    try {
      const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dzphderlh/image/upload', data);
      
      const { url } = uploadRes.data;
      const newProduct = {
        title, desc, prices, extraOptions, img: url,
      }

      await axios.post('/api/products', newProduct)
      setClose(true)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-gray-600/20 text-black fixed top-0 z-10 ">
      <div className="relative w-[360px] md:w-[500px] bg-white py-[10px] px-[50px] rounded-[20px] flex flex-col justify-between">
        <span
          onClick={() => setClose(true)}
          className="absolute top-[-10px] right-[-10px] w-[30px] h-[30px] bg-teal-600 text-white font-[500] rounded-[50%] flex items-center justify-center cursor-pointer"
        >
          X
        </span>
        <h1 className="text-2xl tracking-widest font-bold mb-2">
          Add a new Pizza
        </h1>
        <div className="flex flex-col mb-[10px]">
          <label htmlFor="">Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="flex flex-col mb-[10px]">
          <label>Title</label>
          <input
            className="border-b outline-none"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-[10px]">
          <label>Desc</label>
          <textarea
            className="border outline-none"
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-[10px]">
          <label>Prices</label>
          <input
            className="border-b outline-none"
            type="number"
            placeholder="Small"
            onChange={(e) => changePrice(e, 0)}
          />
          <input
            className="border-b outline-none"
            type="number"
            placeholder="Medium"
            onChange={(e) => changePrice(e, 1)}
          />
          <input
            className="border-b outline-none"
            type="number"
            placeholder="Large"
            onChange={(e) => changePrice(e, 2)}
          />
        </div>
        <div className="h-[70px] scrollbar-thin scrollbar-thumb-black/50 overflow-y-auto">
          <label className="">Extra</label>
          <div>
            <input
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
          </div>
          <div className="flex flex-col mb-[10px]">
            {extraOptions.map((option) => (
              <span
                key={option.text}
                className="w-max px-2 border border-red-500 rounded text-[14px] font-[500] my-[2px]"
              >
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button
          className="w-full mt-4 py-1 px-8 bg-teal-600 rounded text-white font-bold hover:scale-[1.02]"
          onClick={handleExtra}
        >
          Add
        </button>
        <button
          className="w-full my-2 py-1 px-8 bg-green-600 rounded text-white font-bold hover:scale-[1.02]"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}
