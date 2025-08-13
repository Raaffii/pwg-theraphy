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

// service
import { customerService } from "@/services/customerService";

export default function Pos() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState([]);
  const [inventoryType, setInventoryType] = useState();
  const [customerData, setCustomerData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const DataExistCustomer = await customerService.getCustomerData(id);
      setCustomerData(DataExistCustomer[0]);
    };
    fetchData(id);
  }, []);

  return (
    <>
      <p className='text-blue-600 hover:underline my-2 cursor-pointer' onClick={() => navigate("/therapist")}>
        &larr; Back
      </p>
      {/* <h1>{customerData?.name}</h1> */}
      <div className='grid grid-cols-3 gap-2'>
        {/* Inventory */}
        <Inventory selectedData={selectedData} setSelectedData={setSelectedData} inventoryType={inventoryType} setInventoryType={setInventoryType} />

        {/* selected item */}
        <div className='border border-gray-300 shadow-md rounded-2xl w-full p-4 space-y-5'>
          <div className='lg:flex justify-between'>
            <p className='font-semibold'>Customer Name</p>
            <p className='text-purple-600'>{customerData?.name}</p>
          </div>
          <hr />
          <div className='space-y-1'>
            {selectedData.map((item, index) => (
              <PosSelectedItem key={index} id={item.id} name={item.name} price={item.price} amount={item.amount} setSelectedData={setSelectedData} />
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
                <Button
                  className='w-full my-6 bg-purple-700'
                  onClick={() =>
                    navigate("/therapist/receipt", {
                      state: { selectedData, customerData },
                    })
                  }>
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
