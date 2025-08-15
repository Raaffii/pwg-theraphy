import PosCard from "../PosPartialComponent/ItemCard";
import PackageCard from "../PosPartialComponent/PackageCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

//useEffect
import { useEffect, useState } from "react";

//service
import { productsService } from "@/services/productsService";
import { packageService } from "@/services/packageService";
import { Package } from "lucide-react";

export default function Inventory({ selectedData, setSelectedData, customerId }) {
  const [inventoryType, setInventoryType] = useState("Service");
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductOriginal, setDataProductOriginal] = useState([]);
  const [listDataPackage, setListDataPackage] = useState([]);
  const [packageShow, setPackageShow] = useState(false);
  const [packageCusFlag, setPackageCusFlag] = useState(false);

  const handleFilter = async (filter) => {
    setPackageCusFlag(false);
    if (filter == "Package") {
      setInventoryType(filter);
      setPackageShow(true);
      const dataPackage = await packageService.getPackage();
      setListDataPackage(dataPackage);
    } else if (filter == "PackageCus") {
      setPackageCusFlag(true);
      setInventoryType(filter);
      setPackageShow(true);
      const dataPackage = await packageService.getCusPackage(customerId);
      setListDataPackage(dataPackage);
    } else {
      setPackageShow(false);
      setInventoryType(filter);
      const dataProducts = dataProductOriginal.filter((item) => item.productcat === filter);

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
          <Card className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "PackageCus" && "bg-blue-100/90  border border-blue-700"} cursor-pointer`} onClick={() => handleFilter("PackageCus")}>
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
          {listDataPackage.map((item, index) => (
            <PackageCard key={index} item={item} index={index} setSelectedData={setSelectedData} packageCusFlag={packageCusFlag} />
          ))}
        </div>
      )}
    </div>
  );
}
