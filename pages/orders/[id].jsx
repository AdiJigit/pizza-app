import axios from "axios";
import Image from "next/image";
import styles from '../../styles/Order.module.css'

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if(index-status < 1) return styles.done
    if(index-status === 1) return styles.inProgress
    if(index-status > 1) return styles.undone
  }

  return (
    <div className="min-h-screen p-[50px] flex flex-col md:flex-row">
      <div className="md:flex-[2] overflow-x-auto">
        <div>
        <table className='w-[100%] h-[100px] border-spacing-[20px] mb-[50px] border shadow-md'>
          <tr>
            <th className="px-10">Order ID</th>
            <th className="px-10">Customer</th>
            <th className="px-10">Address</th>
            <th className="px-10">Total</th>
          </tr>
          <tr>
            <td className="text-center">
              <span className='mx-4 font-[500] text-[#d1411e] text-[18px]'>{order._id}</span>
            </td>
            <td className="text-center">
              <span className=''>{order.customer}</span>
            </td>
            <td className="text-center">
              <span className='mx-4'>{order.address}</span>
            </td>
            <td className="text-center">
              <span className='ml-4 font-[500] text-[18px]'>${order.total}</span>
            </td>
          </tr>
        </table>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:gap-0 justify-around">
          <div className={statusClass(0)}>
            <Image alt='' src='/img/paid.png' width={30} height={30} />
            <span>Payment</span>
            <div>
              <Image className={styles.checkedIcon} alt='' src='/img/checked.png' width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image alt='' src='/img/bake.png' width={30} height={30} />
            <span>Preparing</span>
            <div>
              <Image className={styles.checkedIcon} alt='' src='/img/checked.png' width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image alt='' src='/img/bike.png' width={30} height={30} />
            <span>On the way</span>
            <div>
              <Image className={styles.checkedIcon} alt='' src='/img/checked.png' width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image alt='' src='/img/delivered.png' width={30} height={30} />
            <span>Delivered</span>
            <div>
              <Image className={styles.checkedIcon} alt='' src='/img/checked.png' width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className=" md:flex-[1] mt-10 md:mt-0 md:ml-10">
        <div className="md:w-[90%] flex flex-col justify-between p-[50px] pt-[20px] max-h-[300px] border shadow-md rounded">
          <h2 className="text-2xl font-bold my-5">CART TOTAL</h2>
          <div className="">
            <b className="mr-[10px]">Subtotal:</b>${order.total}
          </div>
          <div className="">
            <b className="mr-[10px]">Discount:</b>$0.00
          </div>
          <div className="">
            <b className="mr-[10px]">Total:</b>${order.total}
          </div>
          <button disabled className="mt-5 p-2 px-8 bg-teal-600 rounded text-white font-bold">
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};
