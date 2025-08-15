import PosCard from "../PosPartialComponent/ItemCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//useEffect
import { useEffect, useState } from "react";

//service
import { productsService } from "@/services/productsService";
import { packageService } from "@/services/packageService";

export default function Inventory({ selectedData, setSelectedData, customerId }) {
  const [inventoryType, setInventoryType] = useState("Service");
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductOriginal, setDataProductOriginal] = useState([]);
  const [listDataPackage, setListDataPackage] = useState([]);
  const [packageShow, setPackageShow] = useState(false);

  const handleFilter = async (filter) => {
    if (filter == "Package") {
      setInventoryType(filter);
      setPackageShow(true);
      const dataPackage = await packageService.getPackage();
      setListDataPackage(dataPackage);
    } else if (filter == "PackageCus") {
      setInventoryType(filter);
      setPackageShow(true);
      const dataPackage = await packageService.getCusPackage(customerId);
      setListDataPackage(dataPackage);
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
    };

    fetch();
  }, []);

  const handleSelectPackage = (packageid, packagedesc, packageprice, noofsession) => {
    setSelectedData((prev) => {
      const foundItem = prev.find((item) => item.packageid === packageid);

      if (foundItem) {
        console.log("tambah satu");
        return prev.map((item) => (item.packageid === packageid ? { ...item, amount: item.amount + 1 } : item));
      } else {
        return [...prev, { packageid: packageid, packagedesc: packagedesc, price: packageprice, amount: 1, subPrice: packageprice, discount: 0, noofsession: noofsession }];
      }
    });
  };

  console.log("packagess", listDataPackage);

  return (
    <div className='border-2 border-purple-900/30 shadow-md rounded-2xl col-span-2 gap-2 p-2 bg-purple-900/5'>
      <Input className=' bg-white h-10' placeholder='Search' />
      <div className={`w-full lg:grid ${customerId ? "grid-cols-4" : "grid-cols-3"} gap-2 my-5 space-y-2 lg:space-y-0 `}>
        <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Service" && "bg-purple-100/90  border border-purple-950"} cursor-pointer`} onClick={() => handleFilter("Service")}>
          <p>Service</p>
        </Card>
        <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Product" && "bg-purple-100/90 border border-purple-950"} cursor-pointer`} onClick={() => handleFilter("Product")}>
          <p>Product</p>
        </Card>

        <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Package" && "bg-purple-100/90  border border-purple-950"} cursor-pointer`} onClick={() => handleFilter("Package")}>
          <p>Package</p>
        </Card>
        {customerId && (
          <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "PackageCus" && "bg-purple-100/90  border border-purple-950"} cursor-pointer`} onClick={() => handleFilter("PackageCus")}>
            <p>Package Cus</p>
          </Card>
        )}
      </div>

      {!packageShow ? (
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 p-2'>
          {dataProduct.map((item, index) => (
            <PosCard key={index} name={item.name} price={item.unitprice} type={item.productcat} selectedData={selectedData} setSelectedData={setSelectedData} productid={item.productid} />
          ))}
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 gap-3'>
          {listDataPackage?.map((item, index) => (
            <Card className='w-full shadow-md flex flex-col bg-white border-2 hover:border-2 hover:border-purple-900 border-purple-400' key={index}>
              <div className={`w-full flex flex-col  p-3 rounded-t-xl }`}>
                <p className='text-lg font-semibold'>{item.packagedesc}</p>
                <p>${item.price}</p>
              </div>

              <div className='w-full flex flex-col  p-3'>
                {item.productInfo.map((itemProduct, indexProduct) => (
                  <p key={indexProduct}>{itemProduct.description}</p>
                ))}
              </div>
              <div className='w-full flex justify-center p-2 mt-auto bg-purple-300 rounded-b-xl'>
                <Button className={` shadow-none bg-purple-800`} onClick={() => handleSelectPackage(item.packageid, item.packagedesc, item.price, item.noofsession)}>
                  Select
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
