// hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  console.log("wwwwwwwwww", formWalkinData);
  return (
    <>
      <p className='text-blue-600 hover:underline my-2 cursor-pointer' onClick={() => navigate("/therapist")}>
        &larr; Back
      </p>

      {/* <h1>{customerData?.name}</h1> */}
      <div className='grid grid-cols-3 gap-2 mb-8'>
        {/* Inventory */}
        <div className='col-span-2'>
          <div className='w-full'>
            {id ? (
              <Card className='lg:flex p-2 bg-white mb-2 col-span-2'>
                <p className='font-semibold pr-2'>Customer Name : </p>
                <p className=''>{customerData?.name}</p>
              </Card>
            ) : (
              <Card className='p-2 bg-purple-950/40 mb-2  col-span-2 grid grid-cols-3 text-white gap-2'>
                <div>
                  <p>Walkin Name</p>
                  <Input type='name' placeholder='Name' name='walkinName' value={formWalkinData.walkinName} onChange={handleChange} />
                </div>
                <div className='h-full'>
                  <p>Walkin Contact</p>
                  <Input type='Contact' placeholder='Contact' name='walkinContact' value={formWalkinData.walkinContact} onChange={handleChange} />
                </div>
                <div className='h-full'>
                  <p>Walkin Email</p>
                  <Input type='email' placeholder='Email' name='walkinEmail' value={formWalkinData.walkinEmail} onChange={handleChange} />
                </div>
              </Card>
            )}
          </div>
          <Inventory selectedData={selectedData} setSelectedData={setSelectedData} />
        </div>
        {/* selected item */}
        <div className='border border-gray-300 shadow-md rounded-2xl w-full p-4 space-y-5'>
          {/* name
          <hr /> */}
          <div className='space-y-1'>
            <div className=' justify-between bg-slate-100  rounded-md grid lg:grid-cols-6 gap-2'>
              <p className='col-span-3 text-center w-full bg-purple-950/10'>Item</p>
              <p className='text-center w-full'>Amount</p>
              <p className='text-center w-full bg-purple-950/10'>Disc</p>
              <p className='text-center w-full'>Price</p>
            </div>
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
