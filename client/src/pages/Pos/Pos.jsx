// hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
//pages
import PosCard from "./PosPartialComponent/ItemCard";
import PosSelectedItem from "./PosPage/InventorySelected";
import Inventory from "./PosPage/Inventory";
import TotalPriceSelected from "./PosPartialComponent/TotalPriceSelected";
import Modal from "../Shared/Modal";
import Receipt from "./Receipt";
import PosSelectedPackage from "./PosPage/InventorySelectedPackage";

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
          <div className='w-full'>
            {id ? (
              <Card className='lg:flex p-2 bg-white mb-2 col-span-2 flex-col'>
                <div className='flex items-center'>
                  <p className='font-semibold pr-2'>Customer Name :</p>
                  <p>{customerData?.name || "Walk-in Customer"}</p>
                </div>

                {/* Tombol toggle */}
                <button className='text-xs text-blue-600 underline mt-1 w-fit' onClick={() => setShowWalkinInput(!showWalkinInput)}>
                  {showWalkinInput ? "Hide Walkin Input" : "Show Walkin Input"}
                </button>

                {/* Collapse keterangan */}
                {showWalkinInput && (
                  <div className='mt-2 text-sm text-gray-600 grid grid-cols-3 gap-1'>
                    {" "}
                    <div>
                      <Input type='name' placeholder='Walkin name' name='walkinName' value={formWalkinData.walkinName} onChange={handleChange} />
                    </div>
                    <div className='h-full'>
                      <Input type='Contact' placeholder='Walkin contact' name='walkinContact' value={formWalkinData.walkinContact} onChange={handleChange} />
                    </div>
                    <div className='h-full'>
                      <Input type='email' placeholder='Walkin email' name='walkinEmail' value={formWalkinData.walkinEmail} onChange={handleChange} />
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className='g:flex p-2 bg-white mb-2 col-span-2 flex-col'>
                <button className='text-xs text-blue-600 underline mt-1 w-fit' onClick={() => setShowWalkinInput(!showWalkinInput)}>
                  {showWalkinInput ? "Hide Walkin Input" : "Show Walkin Input"}
                </button>

                {/* Collapse keterangan */}
                {showWalkinInput && (
                  <div className='mt-2 text-sm text-gray-600 grid grid-cols-3 gap-1'>
                    {" "}
                    <div>
                      <Input type='name' placeholder='Walkin name' name='walkinName' value={formWalkinData.walkinName} onChange={handleChange} />
                    </div>
                    <div className='h-full'>
                      <Input type='Contact' placeholder='Walkin contact' name='walkinContact' value={formWalkinData.walkinContact} onChange={handleChange} />
                    </div>
                    <div className='h-full'>
                      <Input type='email' placeholder='Walkin email' name='walkinEmail' value={formWalkinData.walkinEmail} onChange={handleChange} />
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
          {/* Inventory */}
          <Inventory selectedData={selectedData} setSelectedData={setSelectedData} customerId={id} />
        </div>
        {/* selected item */}
        <div className='border border-gray-300 shadow-md rounded-2xl w-full p-4 space-y-5 col-span-4'>
          {/* name
          <hr /> */}
          <div className='space-y-1'>
            {selectedData.length != 0 && (
              <div className=' justify-between bg-slate-100  rounded-md grid lg:grid-cols-7 gap-2 '>
                <p className='col-span-3 text-center w-full bg-purple-950/10'>Item</p>
                <p className='text-center w-full col-span'>Subprice</p>
                <p className='text-center w-full col-span-2 bg-purple-950/10'>Discount</p>
                <p className='text-center w-full col-span'>Price</p>
              </div>
            )}
            {selectedData.map((item, index) =>
              item?.packageid ? (
                <PosSelectedPackage packagedesc={item.packagedesc} price={item.price} amount={item.amount} setSelectedData={setSelectedData} selectedData={selectedData} index={index} packageid={item.packageid} />
              ) : (
                <PosSelectedItem key={index} id={item.id} name={item.name} price={item.price} amount={item.amount} setSelectedData={setSelectedData} selectedData={selectedData} index={index} subPrice={item.subPrice} />
              )
            )}
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
