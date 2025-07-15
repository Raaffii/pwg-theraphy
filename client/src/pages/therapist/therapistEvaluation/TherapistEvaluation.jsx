import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2, ClipboardPlus, Package } from "lucide-react";
import Modal from "@/pages/Shared/Modal";
import { Button } from "@/components/ui/button";
import SearcBar from "../../Shared/SearchBar";
import EvaluationForm from "@/pages/customersteps/EvaluationForm";
import useInitializeCustomerForm from "@/hooks/useInitializeCustomerForm";
import { customerService } from "@/services/customerService";
import { calculateAge } from "@/utils/calculateAges";

export default function TherapistEvaluation() {
  const [modalPlus, setModalPlus] = useState(false);
  const [dataExist, setDataExist] = useState({});
  const [age, setAge] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const isDataExist = await customerService.getCustomerData(id);
      setDataExist(isDataExist);
      const yearsold = await calculateAge(isDataExist[0]?.dateofbirth);

      setAge(yearsold);
    };

    fetchData(id);
  }, []);

  return (
    <div>
      <div className='grid lg:grid-cols-2 gap-5'>
        <SearcBar />
        <div className='border border-gray-300 shadow-md rounded-2xl p-2 '>
          <div className='grid grid-cols-3'>
            <p>Name : {dataExist[0]?.name || ""}</p>
            <p>Age : {age || ""}</p>
            <p>Contact : {dataExist[0]?.contact_no || ""}</p>
          </div>
        </div>
      </div>
      <div className='border border-gray-300 shadow-md rounded-2xl mt-5 '>
        <div className='justify-between w-full flex'>
          <h2 className='m-5'>Evalution</h2>{" "}
          <Button className='bg-prime-color hover:bg-prime-color-hover m-5' onClick={() => setModalPlus(true)}>
            +{" "}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className='text-center'>
              <TableHead className='text-center'>Date</TableHead>
              <TableHead className='text-center'>Theraphy</TableHead>
              <TableHead className='text-center'></TableHead>
              <TableHead className='text-center'>Duration</TableHead>
              <TableHead className='text-center'></TableHead>
              <TableHead className='text-center'>Session Notes</TableHead>
              <TableHead className='text-center'>Created</TableHead>
              <TableHead className='text-center'>Updated</TableHead>
              <TableHead className='text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='rounded-xl hover:bg-prime-color cursor-pointer ' onClick={() => setModalActionChoose(true)}>
              <TableCell>20/20/2039</TableCell>
              <TableCell colSpan={2}>7 Wonder</TableCell>
              <TableCell colSpan={2}>900 minute</TableCell>
              <TableCell>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias similique, dignissimos numquam ullam optio possimus molestiae ipsa provident perferendis autem! Esse sed tempore voluptates aperiam ipsam similique magni ab debitis! Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Molestias similique, dignissimos numquam ullam optio possimus molestiae ipsa provident perferendis autem! Esse sed tempore voluptates aperiam ipsam similique magni ab debitis!
              </TableCell>
              <TableCell>20/20/2039</TableCell>
              <TableCell>20/20/2039</TableCell>
              <TableCell className='flex gap-2 h-full items-center'>
                <Eye className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5 ' />
                <Trash2 className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5 ' />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {modalPlus && (
        <Modal setIsOpen={setModalPlus} big={true}>
          {" "}
          <div className='max-h-[600px] overflow-y-auto'>
            <EvaluationForm data={dataExist} />
          </div>
        </Modal>
      )}
    </div>
  );
}
