import { Button } from "@/components/ui/button";

export default function PosSelectedItem({ id, name, price, amount, setSelectedData }) {
  const handlePlus = async (id) => {
    console.log("plus ", id);
    setSelectedData((prev) => prev.map((item) => (item.id === id ? { ...item, amount: item.amount + 1 } : item)));
  };

  const handleMin = async (id) => {
    setSelectedData((prev) => prev.map((item) => (item.id === id ? { ...item, amount: item.amount - 1 } : item)).filter((item) => item.amount > 0));
  };

  return (
    <div className='flex justify-between bg-slate-100 p-1 rounded-md'>
      <div className='flex gap-2'>
        <img src='/wonder.png' alt='' className='w-12 h-12 object-cover rounded-lg' />
        <div>
          <p className='text-m'>{name}</p>
          <p className='text-sm'>${price}</p>
        </div>
      </div>
      <div className='flex items-center'>
        <Button className='bg-transparent shadow-none hover:bg-gray-100 text-black' onClick={() => handlePlus(id)}>
          +
        </Button>
        <p className='w-8 text-center'>{amount}</p>
        <Button className='bg-transparent shadow-none hover:bg-gray-100 text-black' onClick={() => handleMin(id)}>
          -
        </Button>
      </div>
      <div className='flex items-center'>
        <p>${(price * amount).toFixed(2)}</p>
      </div>
    </div>
  );
}
