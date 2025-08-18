import SearcBar from "../Shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//service
import { customerService } from "@/services/customerService";
import { posService } from "@/services/posService";

export default function TransactionHistory() {
  const [customerData, setCustomerData] = useState([]);
  const [cusPosHdData, setCusPosHdData] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("clid", id);
  useEffect(() => {
    const fetchData = async (id) => {
      const DataExistCustomer = await customerService.getCustomerData(id);
      setCustomerData(DataExistCustomer);

      const posData = await posService.getCustomerPosHd(id);
      console.log("cusdat", DataExistCustomer);
    };

    fetchData(id);
  }, []);

  return (
    <>
      {" "}
      <p className='text-blue-600 hover:underline my-2 cursor-pointer' onClick={() => navigate("/therapist")}>
        &larr; Back
      </p>
      <div className='grid lg:grid-cols-2 gap-5'>
        <SearcBar />
        <div className='border border-gray-300 shadow-md rounded-2xl p-2'>
          <div className='flex flex-col sm:flex-row justify-between gap-2 sm:items-center'>
            <div className='flex flex-wrap gap-x-4 gap-y-1 text-sm'>
              <p>Name: {customerData[0]?.name || ""}</p>
              <p>Contact: {customerData[0]?.contact_no || ""}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border border-gray-300 shadow-md rounded-2xl mt-5 '>
        <Table>
          <TableHeader>
            <TableRow className='text-center'>
              <TableHead>Date</TableHead>
              <TableHead>Theraphy</TableHead>
              <TableHead></TableHead>
              <TableHead>Duration</TableHead>
              <TableHead></TableHead>
              <TableHead>Session Notes</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='rounded-xl hover:bg-prime-color cursor-pointer'>
              <TableCell>20/12/1221</TableCell>
              <TableCell colSpan={2}>cek</TableCell>
              <TableCell colSpan={2}>cek</TableCell>
              <TableCell>cek2</TableCell>
              <TableCell>cek3</TableCell>
              <TableCell> cek4</TableCell>
              <TableCell className='flex gap-2 h-full items-center'>
                <Eye className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
                <Trash2 className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
