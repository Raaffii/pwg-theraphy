// hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//pages
import PosCard from "./PosPartialComponent/PosCard";
import PosSelectedItem from "./PosPartialComponent/PosSelectedItem";
import Inventory from "./PosPartialPage/Inventory";
import TotalPriceSelected from "./PosPartialComponent/TotalPriceSelected";
import Modal from "../Shared/Modal";
import Receipt from "./Receipt";

// service
import { customerService } from "@/services/customerService";

export default function Pos() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState([]);
  const [inventoryType, setInventoryType] = useState();
  const [customerData, setCustomerData] = useState();
  const [receiptModal, setReceiptModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const DataExistCustomer = await customerService.getCustomerData(id);
      setCustomerData(DataExistCustomer[0]);
    };
    fetchData(id);
  }, []);

  console.log("price", selectedData);
  return (
    <>
      <p className='text-blue-600 hover:underline my-2 cursor-pointer' onClick={() => navigate("/therapist")}>
        &larr; Back
      </p>
      <div className='lg:flex p-2 bg-white mb-2'>
        <p className='font-semibold pr-2'>Customer Name : </p>
        <p className=''>{customerData?.name}</p>
      </div>
      {/* <h1>{customerData?.name}</h1> */}
      <div className='grid grid-cols-3 gap-2 mb-8'>
        {/* Inventory */}
        <Inventory selectedData={selectedData} setSelectedData={setSelectedData} inventoryType={inventoryType} setInventoryType={setInventoryType} />

        {/* selected item */}
        <div className='border border-gray-300 shadow-md rounded-2xl w-full p-4 space-y-5'>
          {/* name
          <hr /> */}
          <div className='space-y-1'>
            {selectedData.map((item, index) => (
              <PosSelectedItem key={index} id={item.id} name={item.name} price={item.price} amount={item.amount} setSelectedData={setSelectedData} index={index} subPrice={item.subPrice} />
            ))}
            {selectedData.length == 0 && (
              <>
                <p className='text-center'>No item adde yet</p>
              </>
            )}

            {!selectedData.length == 0 && (
              <>
                <br />
                <br />
                <br />
                <TotalPriceSelected selectedData={selectedData} setSelectedData={setSelectedData} />
                <Button className='w-full my-6 bg-purple-700' onClick={() => setReceiptModal(true)}>
                  Save
                </Button>
              </>
            )}

            {receiptModal && (
              <Modal setIsOpen={setReceiptModal}>
                {" "}
                <div className='max-h-[600px] overflow-y-auto'>
                  <Receipt selectedData={selectedData} personData={customerData} />
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
