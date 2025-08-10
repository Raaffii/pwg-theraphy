import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PosCard from "./PosPartialComponent/PosCard";
import PosSelectedItem from "./PosPartialComponent/PosSelectedItem";
import { useNavigate } from "react-router-dom";

export default function Pos() {
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-3 gap-2'>
      <div className='border border-gray-300 shadow-md rounded-2xl col-span-2 gap-2 p-2'>
        <Input className='mb-2' placeholder='Search' />
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
          <PosCard />
          <PosCard />
          <PosCard />
          <PosCard />
          <PosCard />
          <PosCard />
        </div>
      </div>
      <div className='border border-gray-300 shadow-md rounded-2xl w-full p-4 space-y-5'>
        <div className='flex justify-between'>
          <p>Nama Pelanggan Here</p>
          <p>ce</p>
        </div>

        <div className='space-y-1'>
          <PosSelectedItem />
          <PosSelectedItem />
          <PosSelectedItem />
          <PosSelectedItem />
        </div>

        <div>
          <div className='flex justify-between font-semibold'>
            <p>Subtotal</p>
            <p>$25.00</p>
          </div>
          <div className='flex justify-between text-sm'>
            <p>Tax(10%)</p>
            <p>$25.00</p>
          </div>
          <div className='flex justify-between text-sm'>
            <p>Discount</p>
            <p>$25.00</p>
          </div>
        </div>
        <hr />
        <div className='flex justify-between font-semibold '>
          <p>Total</p>
          <p>$25.00</p>
        </div>

        <Button className='w-full my-6' onClick={() => navigate("/therapist/invoice")}>
          Save
        </Button>
      </div>
    </div>
  );
}
