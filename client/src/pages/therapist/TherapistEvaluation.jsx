import { useParams } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2, ClipboardPlus, Package } from "lucide-react";
export default function TherapistEvaluation() {
  const { id } = useParams();
  return (
    <div>
      <div className='grid grid-cols-2 gap-5'>
        <div className='border border-gray-300 shadow-md rounded-2xl p-2'>
          <ul>
            <li>Name : Alexa Barnoa </li>
            <li>Age : 300 Years</li>
            <li>Address : Moon </li>
          </ul>
        </div>
        <div className='border border-gray-300 shadow-md rounded-2xl'> cek</div>
      </div>
      <div className='border border-gray-300 shadow-md rounded-2xl mt-5'>
        <Table>
          <TableHeader>
            <TableRow className='text-center'>
              <TableHead className=''>Name</TableHead>
              <TableHead className=''>Gontact</TableHead>
              <TableHead className=''>Gender</TableHead>
              <TableHead className=''>Email</TableHead>
              <TableHead className=''>Selected Device</TableHead>
              <TableHead className=''>Emergancy Contact</TableHead>
              <TableHead className=''>Emergancy Contact Name</TableHead>
              <TableHead className=''>Status</TableHead>
              <TableHead className=''></TableHead>
              <TableHead className=''></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='rounded-xl hover:bg-prime-color cursor-pointer ' onClick={() => setModalActionChoose(true)}>
              <TableCell>Martion Mola</TableCell>
              <TableCell>082313931232</TableCell>
              <TableCell>M</TableCell>
              <TableCell>hosa@gmail.com</TableCell>
              <TableCell>7 Wonders</TableCell>
              <TableCell>037231212321</TableCell>
              <TableCell>08321323232232</TableCell>
              <TableCell className='text-green-600'>Active</TableCell>
              <TableCell className='flex gap-2'>
                <Eye className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
                <Trash2 className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5 ' />
              </TableCell>
              <TableCell className='items-center justify-center gap-2'>
                <ClipboardPlus className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
