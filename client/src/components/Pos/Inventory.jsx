import PosCard from "./ItemCard";
import PackageCard from "./PackageCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Pagination from "../Shared/Pagination";
//useEffect
import { useEffect, useState, useRef } from "react";

//service
import { packageService } from "@/services/packageService";

import { useProduct } from "@/hooks/useProduct";

export default function Inventory({
  selectedData,
  setSelectedData,
  customerId,
}) {
  const hasFetchedData = useRef(false);
  const [inventoryType, setInventoryType] = useState("Service");
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductOriginal, setDataProductOriginal] = useState([]);
  const [listDataPackage, setListDataPackage] = useState([]);
  const [listDataPackageOriginal, setListDataPackageOriginal] = useState([]);
  const [packageShow, setPackageShow] = useState(false);
  const [packageCusFlag, setPackageCusFlag] = useState(false);

  const {
    fetchProduct,
    product,
    onSearch,
    pagination,
    onPageChange,
    setParams,
    params,
    isLoading,
  } = useProduct();

  const handleFilter = async (filter) => {
    setPackageCusFlag(false);
    if (filter == "Package") {
      setInventoryType(filter);
      setPackageShow(true);
      const dataPackage = await packageService.getPackage();
      setListDataPackage(dataPackage);
      setListDataPackageOriginal(dataPackage);
    } else if (filter == "PackageCus") {
      setPackageCusFlag(true);
      setInventoryType(filter);
      setPackageShow(true);
      const dataPackage = await packageService.getCusPackage(customerId);
      setListDataPackage(dataPackage);
      setListDataPackageOriginal(dataPackage);
    } else {
      setPackageShow(false);

      setInventoryType(filter);

      setParams({ filter: filter, ...params, page: 1 });
      await fetchProduct({ filter: filter });
    }
  };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
    const fetch = async () => {
      setParams({ currentPage: 1, pageSize: 8, page: 1 });
      const data = await fetchProduct({ pageSize: 8, filter: inventoryType });

      let dataProducts;
      if (inventoryType) {
        dataProducts = data.data.filter(
          (item) => item.productcat === inventoryType,
        );
      } else {
        dataProducts = data.data;
      }

      setDataProduct(dataProducts);
      setDataProductOriginal(data.data);
    };

    fetch();
  }, []);

  const searchTimeout = useRef(null);
  const handleSearch = async (e) => {
    const value = e.target.value;

    if (!packageShow) {
      searchTimeout.current = setTimeout(async () => {
        if (value.length >= 2 || value.length === 0) {
          await onSearch(value);
        }
      }, 1000);
    } else {
      const filtered = listDataPackageOriginal.filter((item) =>
        item.packagedesc.toLowerCase().includes(value.toLowerCase()),
      );

      setListDataPackage(filtered);
    }
  };

  return (
    <div className='border-2 border-purple-900/30 shadow-md rounded-2xl col-span-2 gap-2 p-2 bg-purple-900/5'>
      <Input
        className=' bg-white h-10'
        placeholder='Search'
        onChange={handleSearch}
      />
      <div
        className={`w-full lg:grid ${customerId ? "grid-cols-4" : "grid-cols-2"} gap-2 my-5 space-y-2 lg:space-y-0 `}>
        <Card
          className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Service" && "bg-purple-100/90  border border-purple-950"} cursor-pointer`}
          onClick={() => handleFilter("Service")}>
          <p>Service</p>
        </Card>
        <Card
          className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Product" && "bg-purple-100/90 border border-purple-950"} cursor-pointer`}
          onClick={() => handleFilter("Product")}>
          <p>Product</p>
        </Card>

        {customerId && (
          <>
            <Card
              className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "Package" && "bg-purple-100/90  border border-purple-950"} cursor-pointer`}
              onClick={() => handleFilter("Package")}>
              <p>Package</p>
            </Card>
            <Card
              className={`p-3 hover:scale-105 transition-transform duration-300 ${inventoryType == "PackageCus" && "bg-blue-100/90  border border-blue-700"} cursor-pointer`}
              onClick={() => handleFilter("PackageCus")}>
              <p>Package Cus</p>
            </Card>
          </>
        )}
      </div>

      {!packageShow ? (
        <div className='flex flex-col gap-4'>
          {/* Product Grid */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 p-2'>
            {product.map((item, index) => (
              <PosCard
                key={item.productid}
                name={item.name}
                price={item.unitprice}
                type={item.productcat}
                picture={item.picture}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                productid={item.productid}
              />
            ))}

            {isLoading && "Loading ..."}
          </div>

          {/* Pagination always bottom */}
          <div className='flex justify-center'>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 gap-3'>
          {listDataPackage.map((item, index) => (
            <PackageCard
              key={index}
              item={item}
              index={index}
              setSelectedData={setSelectedData}
              packageCusFlag={packageCusFlag}
            />
          ))}

          {!listDataPackage.length > 0 && <p className=''>No Package</p>}
        </div>
      )}
    </div>
  );
}
