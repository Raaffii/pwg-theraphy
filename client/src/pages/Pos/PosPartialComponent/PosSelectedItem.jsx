import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function PosSelectedItem({ id, name, price, subPrice, amount, setSelectedData, index }) {
  const [discountNumber, setDiscountNumber] = useState();
  const [percentDiscount, setPercentDiscount] = useState(false);
  const [totalItemPrice, setTotalItemPrice] = useState(price);

  const handlePlus = async (id) => {
    console.log("plus ", id);
    setSelectedData((prev) => prev.map((item) => (item.id === id ? { ...item, amount: item.amount + 1 } : item)));
  };

  const handleMin = async (id) => {
    setSelectedData((prev) => prev.map((item) => (item.id === id ? { ...item, amount: item.amount - 1 } : item)).filter((item) => item.amount > 0));
  };
  let totalPrice;
  const handleDiscount = (discount) => {
    if (discount) {
      setDiscountNumber(discount);
      totalPrice = (price * amount).toFixed(2);
      totalPrice = (totalPrice - discount).toFixed(2);
      if (percentDiscount) {
        totalPrice = (price * amount).toFixed(2);
        const dicountCut = totalPrice * (discount / 100);
        totalPrice = (totalPrice - dicountCut).toFixed(2);
        console.log("afte dicount", totalPrice);
      }
      setSelectedData((prev) => {
        const newArray = [...prev];
        newArray[index] = { ...newArray[index], subPrice: totalPrice };
        return newArray;
      });

      setTotalItemPrice(totalPrice);
    } else {
      totalPrice = (price * amount).toFixed(2);
      setTotalItemPrice(totalPrice);
    }
  };

  const handlePercent = (p) => {
    setPercentDiscount(!percentDiscount);
    if (p) {
      totalPrice = (price * amount).toFixed(2);
      const dicountCut = totalPrice * (discountNumber / 100);
      totalPrice = (totalPrice - dicountCut).toFixed(2);
    } else {
      totalPrice = (price * amount).toFixed(2);
      totalPrice = (totalPrice - discountNumber).toFixed(2);
    }
    setSelectedData((prev) => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], subPrice: totalPrice };
      return newArray;
    });
    setTotalItemPrice(totalPrice);
  };

  return (
    <div className=' justify-between bg-slate-100 p-1 rounded-md grid lg:grid-cols-5'>
      <div className='flex gap-2 col-span-2'>
        <img src='/wonder.png' alt='' className='w-12 h-12 object-cover rounded-lg' />
        <div>
          <p className='text-m'>{name}</p>
          <p className='text-sm'>${price}</p>
        </div>
      </div>
      <div className='flex items-center col-span-2'>
        <Button className='bg-transparent shadow-none hover:bg-gray-100 text-black' onClick={() => handlePlus(id)}>
          +
        </Button>
        <p className='w-8 text-center'>{amount}</p>
        <Button className='bg-transparent shadow-none hover:bg-gray-100 text-black' onClick={() => handleMin(id)}>
          -
        </Button>
        <div className='flex'>
          <input type='text' className='w-10 mx-1' onChange={(e) => handleDiscount(e.target.value)} />
          <p onClick={() => handlePercent(!percentDiscount)} className={`${percentDiscount ? "text-gray-950" : "text-gray-500"} cursor-pointer`}>
            %
          </p>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        <p>${totalItemPrice}</p>
      </div>
    </div>
  );
}
