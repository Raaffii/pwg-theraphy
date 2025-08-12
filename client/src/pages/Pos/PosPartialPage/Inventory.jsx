import PosCard from "../PosPartialComponent/PosCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

//useEffect
import { useEffect, useState } from "react";

//service
import { productsService } from "@/services/productsService";

export default function Inventory({ selectedData, setSelectedData, inventoryType, setInventoryType }) {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductOriginal, setDataProductOriginal] = useState([]);

  const handleFilter = (filter) => {
    setInventoryType(filter);
    const dataProducts = dataProductOriginal.filter((item) => item.productcat === filter);
    setDataProduct(dataProducts);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await productsService.getProducts();

      let dataProducts;
      if (inventoryType) {
        dataProducts = data.filter((item) => item.productcat === inventoryType);
      } else {
        dataProducts = data;
      }
      setDataProduct(dataProducts);
      setDataProductOriginal(dataProducts);
    };

    fetch();
  }, []);

  return (
    <div className='border border-gray-300 shadow-md rounded-2xl col-span-2 gap-2 p-2'>
      <div className='w-full grid grid-cols-3 gap-2'>
        <Card className={`p-4 hover:scale-105 transition-transform duration-300 ${inventoryType == "Product" && "bg-purple-100/90 border border-purple-500"}`} onClick={() => handleFilter("Product")}>
          <p>Product</p>
          <p className='text-sm text-gray-500'>5 Product</p>
        </Card>
        <Card className={`p-4 hover:scale-105 transition-transform duration-300 ${inventoryType == "Service" && "bg-purple-100/90  border border-purple-500"}`} onClick={() => handleFilter("Service")}>
          <p>Service</p>
          <p className='text-sm text-gray-500'>5 Product</p>
        </Card>
        <Card className='p-4 hover:scale-105 transition-transform duration-300'>
          <p>Package</p>
          <p className='text-sm text-gray-500'>5 Product</p>
        </Card>
      </div>
      <Input className='my-2' placeholder='Search' />
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        {dataProduct.map((item, index) => (
          <PosCard key={index} name={item.name} price={item.unitprice} type={item.productcat} selectedData={selectedData} setSelectedData={setSelectedData} productid={item.productid} />
        ))}
      </div>
    </div>
  );
}
