import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//service
import { customerService } from "@/services/customerService";
import { posService } from "@/services/posService";
import { DataTable } from "@/components/table";
import Modal from "../components/Shared/Modal";
import TrasactionCheck from "@/components/TransactionHistory/TransactionCheck";
import { usePosHd } from "@/hooks/usePosHd";

export default function TransactionHistory() {
  const [customerData, setCustomerData] = useState([]);
  const [cusPosHdData, setCusPosHdData] = useState([]);
  const [modalDetail, setModalDetail] = useState(false);
  const [selected, setSelected] = useState();
  const hasFetchedData = useRef(false);
  const {
    fetchPosHd,
    posHd,
    pagination,
    setParams,
    onPageChange,
    onPageSizeChange,
    params,
  } = usePosHd();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
    const fetchData = async (id) => {
      const DataExistCustomer = await customerService.getCustomerDataById(id);
      setCustomerData(DataExistCustomer);

      const posData = await posService.getCustomerPosHd(id);

      setParams({ ...params, customerId: id });

      await fetchPosHd({ customerId: id });

      setCusPosHdData(posData?.data);
    };

    fetchData(id);
  }, []);

  const handleClick = (item) => {
    setSelected(item);
    setModalDetail((prev) => !prev);
  };

  // slice data sesuai halaman

  const columns = [
    {
      accessorKey: "posinvnum",
      header: "Receipt",
      cellClassName: "text-left",
    },
    {
      accessorKey: "transdate",
      header: "Date",
      cellClassName: "text-left",
      render: (row) => (
        <div className='flex flex-wrap gap-1'>
          <span className='font-semibold p-1 rounded-sm'>
            {row?.transdate
              ? new Date(row.transdate).toISOString().split("T")[0]
              : "-"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "payment_method",
      header: "Payment",
      cellClassName: "text-left",
    },

    {
      accessorKey: "total_amount",
      header: "Total Amount",
      cellClassName: "text-left",
    },
  ];

  return (
    <>
      {" "}
      <p
        className='text-blue-600 hover:underline my-2 cursor-pointer'
        onClick={() => navigate("/therapist")}>
        &larr;Back
      </p>
      <div className='gap-5'>
        <div className='h-full flex items-center'>
          {" "}
          <p>Transaction History</p>
        </div>

        <div className='border border-gray-300 shadow-md rounded-2xl p-2 w-1/2'>
          <div className='flex flex-col sm:flex-row justify-between gap-2 sm:items-center'>
            <div className='flex flex-wrap gap-x-4 gap-y-1 text-sm'>
              <p>Name: {customerData[0]?.name || ""}</p>
              <p>Contact: {customerData[0]?.contact_no || ""}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border border-gray-300 shadow-md rounded-2xl mt-5 '>
        <DataTable
          data={posHd}
          columns={columns}
          onEdit={handleClick}
          pagination={pagination}
          onPageChange={onPageChange}
          onSizeChange={onPageSizeChange}
        />
      </div>
      {modalDetail && (
        <Modal setIsOpen={setModalDetail}>
          <TrasactionCheck
            idPosHd={selected.posid}
            customerData={customerData}
            dataPosHd={selected}
          />
        </Modal>
      )}
    </>
  );
}
