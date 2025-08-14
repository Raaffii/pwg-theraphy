import PosCard from "../PosPartialComponent/PosCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//useEffect
import { useEffect, useState } from "react";

//service
import { productsService } from "@/services/productsService";
import { packageService } from "@/services/packageService";

export default function Inventory({ selectedData, setSelectedData }) {
  const [inventoryType, setInventoryType] = useState("Service");
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductOriginal, setDataProductOriginal] = useState([]);
  const [listDataPackage, setListDataPackage] = useState({});
  const [packageShow, setPackageShow] = useState(false);

  const handleFilter = (filter) => {
    if (filter == "Package") {
      setInventoryType(filter);
      setPackageShow(true);
    } else {
      console.log("filter", filter);
      setPackageShow(false);
      setInventoryType(filter);
      const dataProducts = dataProductOriginal.filter((item) => item.productcat === filter);
      console.log("data product", dataProducts);
      setDataProduct(dataProducts);
    }
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
      setDataProductOriginal(data);

      const dataPackage = await packageService.getPackage();
      console.log("package", dataPackage);
      setListDataPackage(dataPackage);
    };

    fetch();
  }, []);
  const colors = ["bg-red-900", "bg-blue-900", "bg-green-900"];
  return (
    <div className='border-2 border-purple-900/30 shadow-md rounded-2xl col-span-2 gap-2 p-2 bg-purple-900/5'>
      <Input className=' bg-white h-10' placeholder='Search' />
      <div className='w-full lg:grid grid-cols-3 gap-2 my-5 space-y-2 lg:space-y-0 '>
        <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Service" && "bg-purple-100/90  border border-purple-950"} cursor-pointer`} onClick={() => handleFilter("Service")}>
          <p>Service</p>
        </Card>
        <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Product" && "bg-purple-100/90 border border-purple-950"} cursor-pointer`} onClick={() => handleFilter("Product")}>
          <p>Product</p>
        </Card>

        <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Package" && "bg-purple-100/90  border border-purple-950"} cursor-pointer`} onClick={() => handleFilter("Package")}>
          <p>Package</p>
        </Card>
      </div>

      {!packageShow ? (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 p-2'>
          {dataProduct.map((item, index) => (
            <PosCard key={index} name={item.name} price={item.unitprice} type={item.productcat} selectedData={selectedData} setSelectedData={setSelectedData} productid={item.productid} />
          ))}
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 gap-3'>
          {listDataPackage.map((item, index) => (
            <Card className='w-full shadow-md flex flex-col' key={index}>
              <div className={`w-full flex flex-col items-center p-1 rounded-t-xl text-white ${colors[index % colors.length]}`}>
                <p className='text-lg font-semibold'>{item.packagedesc}</p>
                <p>${item.price}</p>
              </div>

              <div className='w-full flex flex-col items-center p-3'>
                {item.productInfo.map((itemProduct, indexProduct) => (
                  <p key={indexProduct}>{itemProduct.description}</p>
                ))}
              </div>
              <div className='w-full flex justify-center p-2 mt-auto'>
                <Button className={`${colors[index % colors.length]} shadow-none`}>Select</Button>
              </div>
            </Card>
          ))}

          {/* <Card className='w-full shadow-md flex flex-col'>
            <div className='w-full  flex flex-col items-center p-1 bg-blue-900 rounded-t-xl text-white '>
              <p className='text-lg font-semibold'>Fourlogy</p>
              <p>$322</p>
            </div>

            <div className='w-full flex flex-col items-center p-3'>
              <p>7 Wonder</p>
              <p>7 Wonder</p>
              <p>7 Wonder</p>
            </div>
            <div className='w-full flex justify-center p-2 mt-auto'>
              <Button className='bg-purple-950'>Select</Button>
            </div>
          </Card>
          <Card className='w-full shadow-md flex flex-col'>
            <div className='w-full  flex flex-col items-center p-1 bg-green-900 rounded-t-xl text-white '>
              <p className='text-lg font-semibold'>Fourlogy</p>
              <p>$322</p>
            </div>

            <div className='w-full flex flex-col items-center p-3'>
              <p>7 Wonder</p>
              <p>7 Wonder</p>
              <p>7 Wonder</p>
            </div>
            <div className='w-full flex justify-center p-2 mt-auto'>
              <Button className='bg-purple-950'>Select</Button>
            </div>
          </Card> */}
        </div>
      )}
    </div>
  );
}
