
export default function AddButton({ setClose }) {
  return (
    <div onClick={() => setClose(false)} className='ml-10 py-2 px-8 bg-red-500 rounded text-white font-bold hover:scale-[1.02] cursor-pointer w-max'>
      Add New Pizza
    </div>
  )
}
