import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

export default function Admin({ orders, products }) {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ['preparing', 'on the way', 'delivered'];
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        'http://localhost:3000/api/products/' + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put('http://localhost:3000/api/orders/' + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(order);
    }
  };

  return (
    <div className="min-h-screen p-[50px] flex flex-col gap-20 md:gap-0 md:flex-row">
      <div className="md:flex-[1]">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <table className="w-[100%] border-spacing-[20px] text-left">
          <tbody>
            <tr className="">
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className="">
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    className="object-cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className=" py-1 px-4 text-white font-[500] bg-teal-600 cursor-pointer mr-[10px]">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="py-1 px-2 text-white font-[500] bg-red-500 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="md:flex-[1]">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <table className="w-[100%] border-spacing-[20px] text-left">
          <tbody>
            <tr className="">
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr>
                <td>{order._id.slice(0, 5)}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    onClick={() => handleStatus(order._id)}
                    className="border-[4px] py-1 border-white px-2 text-white font-[500] bg-teal-600 cursor-pointer mr-[10px]"
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  const productRes = await axios.get('http://localhost:3000/api/products');
  const orderRes = await axios.get('http://localhost:3000/api/orders');

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};
