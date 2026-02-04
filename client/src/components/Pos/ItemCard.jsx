import { Card } from "@/components/ui/card";

export default function PosCard({
  name,
  price,
  type,
  selectedData,
  setSelectedData,
  productid,
  picture,
}) {
  const cardClick = async (id, name, price, type, picture) => {
    setSelectedData((prev) => {
      const foundItem = prev.find((item) => item.id === id);

      if (foundItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item,
        );
      } else {
        return [
          ...prev,
          {
            id,
            name,
            price,
            type,
            picture,
            amount: 1,
            subPrice: price,
            discount: 0,
            discpercent: 0,
          },
        ];
      }
    });
  };
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <Card
      className='p-2 flex-row hover:scale-105 transition-transform duration-300'
      onClick={() => cardClick(productid, name, price, type, picture)}>
      <img
        src={picture ? `${API_URL}/uploads/${picture}` : ""}
        alt=''
        className='w-full h-24 object-cover rounded-lg'
      />

      <p className='my-2'>{name}</p>
      <div className='flex justify-between'>
        <p className='text-xs text-gray-500'>{price}</p>
        <p className='text-xs text-gray-500'>{type}</p>
      </div>
    </Card>
  );
}
