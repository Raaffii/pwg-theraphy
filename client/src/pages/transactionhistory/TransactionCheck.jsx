import { useEffect, useState } from "react";
import { posService } from "@/services/posService";
import { Button } from "@/components/ui/button";
import PrintReceipt from "../Pos/PrintReceipt";

export default function TrasactionCheck({ idPosHd, customerData }) {
  const [dataPosline, setDataPosLine] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await posService.getCustomerPosLine(idPosHd);
      setDataPosLine(result.data);
      console.log("ini loh", result.data);
    };

    fetch();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const totalPrice = dataPosline.reduce((total, item) => total + item.total_price * 1, 0).toFixed(2);
  return (
    <div>
      <table className='w-full border border-gray-300 text-sm mb-6 shadow-sm rounded-lg overflow-hidden'>
        <thead>
          <tr className='bg-gray-100 text-left'>
            <th className='border border-gray-300 px-3 py-2 font-medium w-[60%]' colSpan={3}>
              Description
            </th>
            <th className='border border-gray-300 px-3 py-2 font-medium w-[10%] text-center'>Quantity</th>
            <th className='border border-gray-300 px-3 py-2 font-medium w-[15%] text-center'>Unit Price</th>
            <th className='border border-gray-300 px-3 py-2 font-medium w-[15%] text-center'>SubTotal</th>
            <th className='border border-gray-300 px-3 py-2 font-medium w-[15%] text-center'>Discount</th>
            <th className='border border-gray-300 px-3 py-2 font-medium w-[15%] text-center'>Total</th>
          </tr>
        </thead>

        <tbody>
          {dataPosline.map((item, index) => (
            <tr className='hover:bg-gray-50' key={index}>
              <td className='border border-gray-300 px-3 py-2' colSpan={3}>
                {item.package ? item.packagedesc : item.name}
              </td>
              <td className='border border-gray-300 px-3 py-2 text-center'>{item.qty}</td>
              <td className='border border-gray-300 px-3 py-2 text-center'>${item.unitprice}</td>
              <td className='border border-gray-300 px-3 py-2 text-center'>${item.price}</td>
              <td className='border border-gray-300 px-3 py-2 text-center'>{item.discpercent ? `${item.disc}%` : `-$${item.disc}`}</td>
              <td className='border border-gray-300 px-3 py-2 text-center'>${item.total_price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='bg-gray-100'>
            <td className='border border-gray-300 px-3 py-2 text-right font-medium' colSpan={7}>
              Total
            </td>
            <td className='border border-gray-300 px-3 py-2 text-center font-medium'>${totalPrice}</td>
          </tr>
        </tfoot>
      </table>
      <div className='flex gap-2 justify-end'>
        <Button>Sent To email</Button>
        <Button onClick={handlePrint}>Print</Button>
      </div>
      <div className='print-only'>
        <PrintReceipt selectedData={dataPosline} personData={customerData} />
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
    </div>
  );
}
