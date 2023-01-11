import PizzaCard from './PizzaCard';

export default function PizzaList({ pizzaList }) {
  return <div className='py-[20px] px-[10px] flex flex-col items-center'>
    <h1 className='text-3xl md:text-4xl font-bold mb-8'>PIZZA NINJA, FOOD & SERVICES</h1>
    <p className='w-[70%] text-[18px] md:text-[24px] text-[#444]'>Explore all the delicious options you can find at Papa Johns. Whether you’re looking for carryout or delivery, choose your favorite pizza, sides and more for the whole family.</p>
    <div className='w-[100%] flex flex-wrap items-center justify-center'>
      {
        pizzaList.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))
        }
    </div>
  </div>;
}
