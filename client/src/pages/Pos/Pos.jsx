// hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
//pages
import PosCard from "./PosPartialComponent/ItemCard";
import InventorySelected from "./PosPage/InventorySelected";
import Inventory from "./PosPage/Inventory";
import TotalPriceSelected from "./PosPartialComponent/TotalPriceSelected";
import Modal from "../Shared/Modal";
import Receipt from "./Receipt";
import InventortySelectedPackage from "./PosPage/InventorySelectedPackage";
import CustomerDataAndWalkin from "./PosPage/CustomerDataAndWalkin";
import InventorySelectedHeader from "./PosPage/InventorySelectedHeader";

// service
import { customerService } from "@/services/customerService";

export default function Pos() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState([]);
  const [customerData, setCustomerData] = useState();
  const [receiptModal, setReceiptModal] = useState(false);
  const [showWalkinInput, setShowWalkinInput] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const DataExistCustomer = await customerService.getCustomerData(id);
      setCustomerData(DataExistCustomer[0]);
    };
    fetchData(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormWalkinData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [formWalkinData, setFormWalkinData] = useState({
    walkinName: "",
    walkinEmail: "",
    walkinContact: "",
  });

  return (
    <>
      <p className='text-blue-600 hover:underline my-2 cursor-pointer' onClick={() => navigate("/therapist")}>
        &larr; Back
      </p>

      {/* <h1>{customerData?.name}</h1> */}
      <div className='grid grid-cols-10 gap-2 mb-8'>
        <div className='col-span-6'>
          <CustomerDataAndWalkin showWalkinInput={showWalkinInput} setShowWalkinInput={setShowWalkinInput} handleChange={handleChange} formWalkinData={formWalkinData} id={id} />
          <Inventory selectedData={selectedData} setSelectedData={setSelectedData} customerId={id} />
        </div>
        {/* selected item */}
        <div className='border border-gray-300 shadow-md rounded-2xl w-full p-4 space-y-5 col-span-4'>
          <div className='space-y-1'>
            {selectedData.length != 0 && <InventorySelectedHeader />}
            {selectedData.map((item, index) =>
              item?.packageid ? (
                <InventorySelected packagedesc={item.packagedesc} price={item.price} packageName={item.packageName} amount={item.amount} setSelectedData={setSelectedData} selectedData={selectedData} index={index} packageid={item.packageid} />
              ) : (
                <InventortySelectedPackage key={index} id={item.id} name={item.name} price={item.price} amount={item.amount} setSelectedData={setSelectedData} selectedData={selectedData} index={index} subPrice={item.subPrice} />
              )
            )}

            {selectedData.length == 0 && (
              <>
                <p className='text-center'>No item adde yet</p>
              </>
            )}

            {!selectedData.length == 0 && (
              <>
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
                  <Receipt selectedData={selectedData} personData={customerData} formWalkinData={formWalkinData} />
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
