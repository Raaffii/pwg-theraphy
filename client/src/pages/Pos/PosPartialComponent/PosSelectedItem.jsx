import { Button } from "@/components/ui/button";

export default function PosSelectedItem() {
  return (
    <div className='flex justify-between bg-slate-100 p-1 rounded-md'>
      <div className='flex gap-2'>
        <img src='/wonder.png' alt='' className='w-12 h-12 object-cover rounded-lg' />
        <div>
          <p className='text-m'>7 Wonder</p>
          <p className='text-sm'>$30.22</p>
        </div>
      </div>
      <div className='flex items-center'>
        <Button className='bg-transparent shadow-none hover:bg-gray-100 text-black'>+</Button>
        <p className='w-8 text-center'>10</p>
        <Button className='bg-transparent shadow-none hover:bg-gray-100 text-black'>-</Button>
      </div>
      <div className='flex items-center'>
        <p>$40.32</p>
      </div>
    </div>
  );
}
