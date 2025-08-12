export default function TotalPriceSelected({ selectedData, setSelectedData }) {
  const subTotalPrice = selectedData.reduce((total, item) => total + item.price * item.amount, 0).toFixed(2);
  const dicountPrice = (subTotalPrice * 0.1).toFixed(2);
  const total = (Number(subTotalPrice) + Number(dicountPrice)).toFixed(2);
  return (
    <div className='m-4'>
      <div className=''>
        <div className='flex justify-between font-semibold'>
          <p>Subtotal</p>
          <p>${subTotalPrice}</p>
        </div>
        <div className='flex justify-between text-sm'>
          <p>Tax(10%)</p>
          <p>${dicountPrice}</p>
        </div>
        {/* <div className='flex justify-between text-sm'>
          <p>Discount</p>
          <p>$25.00</p>
        </div> */}
      </div>
      <hr />
      <div className='flex justify-between font-semibold '>
        <p>Total</p>
        <p>${total}</p>
      </div>
    </div>
  );
}
