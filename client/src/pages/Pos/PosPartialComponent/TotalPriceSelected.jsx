export default function TotalPriceSelected({ selectedData, setSelectedData }) {
  console.log("selected", selectedData);
  const subTotalPrice = selectedData.reduce((total, item) => total + item.subPrice * item.amount, 0).toFixed(2);

  return (
    <div className='m-4'>
      <div className=''>
        {/* <div className='flex justify-between font-semibold'>
          <p>Subtotal</p>
          <p>${subTotalPrice}</p>
        </div>
        <div className='flex justify-between text-sm'>
          <p>Tax(10%)</p>
          <p>${dicountPrice}</p>
        </div> */}
        {/* <div className='flex justify-between text-sm'>
          <p>Discount</p>
          <p>$25.00</p>
        </div> */}
      </div>
      <hr />
      <div className='flex justify-between font-semibold '>
        <p>Total</p>
        <p>${subTotalPrice}</p>
      </div>
    </div>
  );
}
