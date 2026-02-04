import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Eye, Trash2 } from "lucide-react";
export default function TransactionHistoryItem({ item, index }) {
  return (
    <>
      <TableRow className='rounded-xl hover:bg-prime-color cursor-pointer'>
        {}
        <TableCell className='text-center'>{new Date(item.transdate).toLocaleString()}</TableCell>
        <TableCell className='text-center'>{item.payment_method}</TableCell>
        <TableCell className='text-center'>{item.total_amount}</TableCell>

        <TableCell className='flex gap-2 h-full items-center  justify-center'>
          <Eye className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
          <Trash2 className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
        </TableCell>
      </TableRow>
    </>
  );
}
