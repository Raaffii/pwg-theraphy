import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import PrintReceipt from "./PrintReceipt";

export default function Receipt() {
  const navigate = useNavigate();

  const location = useLocation();
  const selectedData = location.state?.selectedData || [];

  console.log("brobrobro", selectedData);
  const totalPrice = selectedData.reduce((total, item) => total + item.price * item.amount, 0).toFixed(2);

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <p className='text-blue-600 hover:underline my-2 cursor-pointer' onClick={() => navigate("/therapist")}>
        &larr; Back
      </p>
      <div className='my-3'>
        <p className='text-xl font-semibold'>Transaction Overview</p>
        <p>Customer : Arief Muhammad</p>
      </div>

      <div>
        <div className='w-full flex items-center mb-7'>
          <p className='flex gap-2'>
            <ScrollText />
            Order Sumarry
          </p>
          <hr className='flex-1 border-t-4 border-gray-400 ml-2' />
        </div>
        <table className='w-full border border-gray-300 text-sm mb-6 shadow-sm rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='border border-gray-300 px-3 py-2 font-medium w-[60%]' colSpan={3}>
                Description
              </th>
              <th className='border border-gray-300 px-3 py-2 font-medium w-[10%]'>Quantity</th>
              <th className='border border-gray-300 px-3 py-2 font-medium w-[15%]'>Unit Price</th>
              <th className='border border-gray-300 px-3 py-2 font-medium w-[15%]'>Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((item, index) => (
              <tr className='hover:bg-gray-50' key={index}>
                <td className='border border-gray-300 px-3 py-2' colSpan={3}>
                  {item.name}
                </td>
                <td className='border border-gray-300 px-3 py-2 text-center'>{item.amount}</td>
                <td className='border border-gray-300 px-3 py-2 text-right'>${item.price}</td>
                <td className='border border-gray-300 px-3 py-2 text-right'>${(item.amount * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='bg-gray-100'>
              <td className='border border-gray-300 px-3 py-2 text-right font-medium' colSpan={5}>
                Total
              </td>
              <td className='border border-gray-300 px-3 py-2 text-right font-medium'>${totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div>
        <div className='w-full flex items-center mb-7 mt-10'>
          <p className='flex gap-2'>
            {" "}
            <CreditCard /> Payment Detail
          </p>
          <hr className='flex-1 border-t-4 border-gray-400 ml-2' />
        </div>
        <div className='flex justify-between items-center my-3 p-3 bg-gray-200 rounded-lg'>
          <p className='text-xl'>Total Due</p>
          <p className='text-2xl font-bold'>${totalPrice}</p>
        </div>
        <div className=''>
          <p className='mb-3'>Select Payment Menthod</p>
          <div className='flex gap-9'>
            <label className='inline-flex items-center bg-gray-300 p-3 rounded-sm w-40'>
              <input type='radio' name='paymentMethod' value='creditCard' className='form-radio text-blue-600' />
              <span className='ml-2'>Credit Card</span>
            </label>

            <label className='inline-flex items-center bg-gray-300 p-3 rounded-sm w-40'>
              <input type='radio' name='paymentMethod' value='debitCard' className='form-radio text-blue-600' />
              <span className='ml-2'>Debit Card</span>
            </label>

            <label className='inline-flex items-center bg-gray-300 p-3 rounded-sm w-40'>
              <input type='radio' name='paymentMethod' value='cash' className='form-radio text-blue-600' />
              <span className='ml-2'>Cash</span>
            </label>

            <label className='inline-flex items-center bg-gray-300 p-3 rounded-sm w-40'>
              <input type='radio' name='paymentMethod' value='mobilePay' className='form-radio text-blue-600' />
              <span className='ml-2'>Mobile Pay</span>
            </label>
          </div>
        </div>
        <hr className='flex-1 border-t-3 border-gray-400 my-5' />
        <div className='flex justify-between items-center'>
          <div className='h-full'>
            <p className='mb-3 '>Receipt Option</p>
            <div className='flex gap-9'>
              <label className='inline-flex items-center'>
                <input type='radio' name='paymentMethod' value='email' className='form-radio text-blue-600' />
                <span className='ml-2'>Email Receipt</span>
              </label>

              <label className='inline-flex items-center'>
                <input type='radio' name='paymentMethod' value='debitCard' className='form-radio text-blue-600' />
                <span className='ml-2'>Print Receipt</span>
              </label>
            </div>
          </div>
          <div className='print-only'>
            <PrintReceipt />
          </div>
          <Button onClick={handlePrint}>Save</Button>
        </div>
      </div>
      <style>{`
        .print-only {
          display: none;
        }
        @media print {
          .print-only {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
