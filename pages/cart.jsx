import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { reset } from '../redux/cartSlice';
import OrderDetails from '../components/OrderDetails';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`https://pizza-app-rho.vercel.app/api/orders`, data);
      res.status === 201 && router.push('/orders/' + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className="md:min-h-screen p-4 md:p-[50px] flex flex-col md:flex-row">
      <div className="md:flex-[2] overflow-x-auto">
        <table className="w-[100%] border-spacing-[20px]">
          <tbody>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="w-[100px] h-[100px] relative">
                    <Image
                      alt=""
                      src={product.img}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td>
                  <span className="mx-4 font-[500] text-[#d1411e] text-[18px]">
                    {product.title}
                  </span>
                </td>
                <td>
                  <span className="">
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className="mx-4">${product.price}</span>
                </td>
                <td className="text-center">
                  <span>{product.quantity}</span>
                </td>
                <td>
                  <span className="ml-4 font-[500] text-[18px]">
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1 mt-[50px] md:mt-0">
        <div className="w-[90%] flex flex-col justify-between p-[50px] pt-[20px] max-h-[300px] border shadow-md rounded">
          <h2 className="text-2xl font-bold my-5">CART TOTAL</h2>
          <div className="">
            <b className="mr-[10px]">Subtotal:</b>${cart.total}
          </div>
          <div className="">
            <b className="mr-[10px]">Discount:</b>$0.00
          </div>
          <div className="mb-4">
            <b className="mr-[10px]">Total:</b>${cart.total}
          </div>
          {open ? (
            <div className="flex flex-col">
              <button
                onClick={() => setCash(true)}
                className="w-full mt-5 mb-2 p-2 px-8 bg-red-500 rounded text-white font-bold hover:scale-[1.02] duration-300 cursor-pointer"
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'AUIt50mJAi6NJokQJXZG75SjFP2mDy9Gs7Bq2L-Jwbe4ebdBquR4RLEkfnwwIelyTH8q52yt1um1cHhq',
                  components: 'buttons',
                  currency: 'USD',
                  'disable-funding': 'credit,card,p24',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="mt-5 p-2 px-8 bg-red-500 rounded text-white font-bold hover:scale-[1.02] duration-300 cursor-pointer"
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
    </div>
  );
}
