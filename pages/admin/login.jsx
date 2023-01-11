import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post(`${process.env.VERCEL_URL}/api/login`, {
        username,
        password,
      });
      router.push('/admin')
    } catch (err) {
      setError(true)
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-col w-[50%] md:w-[30%]">
        <h1 className='text-3xl font-bold mb-4'>Admin Dashboard</h1>
        <input
          placeholder="username"
          className="h-[40px] mb-[20px] px-[10px] outline-none border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="h-[40px] mb-[20px] px-[10px] outline-none border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className="py-2 bg-red-500 rounded text-lg font-bold text-white hover:scale-[1.02] duration-300">
          Sign In
        </button>
        {error && <span className="text-[14px] mt-2 text-red-500">Wrong Credentials!</span>}
      </div>
    </div>
  );
}
