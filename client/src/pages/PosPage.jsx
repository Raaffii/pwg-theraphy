// hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component

import { Button } from "@/components/ui/button";

import InventorySelected from "../components/Pos/InventorySelected";
import Inventory from "../components/Pos/Inventory";
import TotalPriceSelected from "../components/Pos/TotalPriceSelected";
import Modal from "../components/Shared/Modal";
import Receipt from "@/components/InvoiceReceipt/Receipt";
import InventortySelectedPackage from "../components/Pos/InventorySelectedPackage";
import CustomerDataAndWalkin from "../components/Pos/CustomerDataAndWalkin";
import InventorySelectedHeader from "../components/Pos/InventorySelectedHeader";

// service

import { useCustomer } from "@/hooks/useCustomer";

export default function PosPage() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState([]);

  const [receiptModal, setReceiptModal] = useState(false);
  const [showWalkinInput, setShowWalkinInput] = useState(false);

  const { id } = useParams();
  const { fetchCustomerDataById, customer: customerData } = useCustomer();

  useEffect(() => {
    const fetchData = async (id) => {
      if (id) {
        await fetchCustomerDataById(id);
      }
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

  const handleDeleteAll = async () => {
    setSelectedData([]);
  };

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <p
        className='text-blue-600 hover:underline my-2 cursor-pointer'
        onClick={() => navigate("/therapist")}>
        &larr;Back
      </p>

      {/* <h1>{customerData?.name}</h1> */}
      <div className='grid grid-cols-10 gap-2 mb-8'>
        <div className='col-span-6'>
          <CustomerDataAndWalkin
            showWalkinInput={showWalkinInput}
            setShowWalkinInput={setShowWalkinInput}
            handleChange={handleChange}
            customerData={customerData}
            formWalkinData={formWalkinData}
            id={id}
          />
          <Inventory
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            customerId={id}
          />
        </div>
        {/* selected item */}
        <div className='border border-gray-300 shadow-md rounded-2xl w-full p-4 space-y-5 col-span-4'>
          {!selectedData.length == 0 && (
            <div className='w-full flex justify-between items-center'>
              <div>
                <p>List Of Selected Item</p>
                <p className='text-xs text-gray-500'>
                  {now.toLocaleDateString()}{" "}
                  {now.toLocaleTimeString({
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>

              <button
                title='delete all'
                onClick={handleDeleteAll}
                className='bg-red-600 text-white rounded-lg p-1 shadow-sm'>
                reset
              </button>
            </div>
          )}
          <hr />
          <div className='space-y-1'>
            {selectedData.length != 0 && <InventorySelectedHeader />}
            {selectedData.map((item, index) =>
              item?.packageid ? (
                <InventortySelectedPackage
                  key={index}
                  item={item}
                  packagedesc={item.packagedesc}
                  price={item.price}
                  packageName={item.packageName}
                  amount={item.amount}
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                  index={index}
                  packageid={item.packageid}
                />
              ) : (
                <InventorySelected
                  key={index}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                  picture={item.picture}
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                  index={index}
                  subPrice={item.subPrice}
                />
              ),
            )}

            {selectedData.length == 0 && (
              <>
                <p className='text-center'>No item adde yet</p>
              </>
            )}

            {!selectedData.length == 0 && (
              <>
                <TotalPriceSelected
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                />
                <Button
                  className='w-full my-6 bg-purple-700'
                  onClick={() => setReceiptModal(true)}>
                  Save
                </Button>
              </>
            )}

            {receiptModal && (
              <Modal setIsOpen={setReceiptModal}>
                {" "}
                <div className='max-h-[600px] overflow-y-auto'>
                  <Receipt
                    selectedData={selectedData}
                    personData={customerData}
                    formWalkinData={formWalkinData}
                    setSelectedData={setSelectedData}
                  />
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
