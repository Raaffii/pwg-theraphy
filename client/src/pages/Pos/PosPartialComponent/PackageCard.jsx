import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PackageCard({ item, index, packageCusFlag, setSelectedData }) {
  const handleSelectPackage = (packageid, packagedesc, packageprice, noofsession, packageName) => {
    setSelectedData((prev) => {
      const foundItem = prev.find((item) => item.packageid === packageid);

      if (foundItem) {
        return prev.map((item) => (item.packageid === packageid ? { ...item, amount: item.amount + 1 } : item));
      } else {
        return [...prev, { packageid: packageid, packagedesc: packagedesc, price: packageprice, amount: 1, subPrice: packageprice, discount: 0, noofsession: noofsession, packageName: packageName }];
      }
    });
  };
  return (
    <Card className={`w-full shadow-md flex flex-col bg-white border-2 hover:border-2 ${packageCusFlag ? "hover:border-blue-900 border-blue-400" : "hover:border-purple-900 border-purple-400"}`} key={index}>
      <div className='w-full p-3 rounded-t-xl flex-grow'>
        <p className='text-lg font-semibold'>Package {index + 1}</p>
        <p>{item.packagedesc}</p>
      </div>

      <p className='mt-auto w-full text-right pr-3 font-semibold text-purple-950'>${item.price}</p>

      <div className={`w-full flex justify-center p-2 mt-auto ${packageCusFlag ? "bg-blue-300" : "bg-purple-300"} rounded-b-xl`}>
        <Button className={`shadow-none ${packageCusFlag ? "bg-blue-800" : "bg-purple-800"}`} onClick={() => handleSelectPackage(item.packageid, item.packagedesc, item.price, item.noofsession, `Package ${index + 1}`)}>
          Select
        </Button>
      </div>
    </Card>
  );
}
