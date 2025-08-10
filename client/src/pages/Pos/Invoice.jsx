import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceSetup from "./PosPartialComponent/InvoiceSetup";

export default function Invoice() {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10'>
      {/* Invoice */}
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg' id='invoice'>
        <h1 className='text-2xl font-bold text-center mb-4'>Succes</h1>

        <div className='mb-4'>
          <p className='text-sm'>Date: {new Date().toLocaleDateString()}</p>
          <p className='text-sm'>Invoice: INV-{Date.now()}</p>
        </div>

        <div className='flex justify-between'>
          <div>
            <p>Item A</p>
            <p className='text-gray-500'>32.32</p>
          </div>
          <div className='text-right'>
            <p>64.64</p>
            <p className='text-gray-500'>x2</p>
          </div>
        </div>
        <div className='flex justify-between'>
          <div>
            <p>Item A</p>
            <p className='text-gray-500'>32.32</p>
          </div>
          <div className='text-right'>
            <p>64.64</p>
            <p className='text-gray-500'>x2</p>
          </div>
        </div>
        <div className='flex justify-between'>
          <div>
            <p>Item A</p>
            <p className='text-gray-500'>32.32</p>
          </div>
          <div className='text-right'>
            <p>64.64</p>
            <p className='text-gray-500'>x2</p>
          </div>
        </div>

        <div className='my-10'>
          <div className='flex justify-between text-gray-500'>
            <p>Subtotal</p>
            <p className='text-right text-black'>64.64</p>
          </div>
          <div className='flex justify-between text-gray-500'>
            <p>Tax</p>
            <p className='text-right text-black'>1.00</p>
          </div>
          <div className='flex justify-between text-gray-500'>
            <p>Total</p>
            <p className='text-right text-black'>65.64</p>
          </div>
        </div>

        <div className='my-10'>
          <div className='flex justify-between text-gray-500'>
            <p>Cash</p>
            <p className='text-right text-black'>64.64</p>
          </div>
          <div className='flex justify-between text-gray-500'>
            <p>Return</p>
            <p className='text-right text-black'>31.00</p>
          </div>
        </div>
      </div>
      {/* Invoice End */}
      <div className='mt-8 space-y-2 w-full max-w-lg'>
        <Button onClick={() => console.log("Back to POS")} className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-blue-600 w-full'>
          Back To Pos
        </Button>
        <Button onClick={handlePrint} className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-900 w-full'>
          Print Invoice
        </Button>
      </div>

      <InvoiceSetup />
    </div>
  );
}
