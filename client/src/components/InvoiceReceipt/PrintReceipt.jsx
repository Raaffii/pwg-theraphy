export default function PrintReceipt({
  posSetup,
  selectedData,
  personData,
  discountShow,
  paymentMethod,
  availableposinvnum,
  transdate,
}) {
  const totalPrice = selectedData
    .reduce((total, item) => total + item.subPrice * 1, 0)
    .toFixed(2);

  return (
    <>
      <div
        id='printreceipt'
        className='min-h-screen flex flex-col bg-white text-black'>
        {/* ================= HEADER ================= */}
        <div className='flex justify-between items-center bg-purple-500/50 p-2'>
          <div className='flex items-center gap-2'>
            <img src='/pwglogo.svg' alt='' className='w-20' />
            <p className='font-semibold'>{posSetup?.coyname}</p>
          </div>
          <div className='text-sm text-right'>
            <p>
              Payment Date :{" "}
              {transdate
                ? new Date(transdate).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </p>
            <p>Receipt #{availableposinvnum || posSetup?.nextinvnum + 1}</p>
          </div>
        </div>

        <div className='flex-1 px-5'>
          <div className='mt-6 flex justify-between p-2'>
            <div>
              <p className='font-semibold'>From</p>
              <p>{posSetup?.coyname}</p>
              <p>
                {posSetup?.addr1} {posSetup?.addr2} {posSetup?.addr3}
              </p>
              <p>{posSetup?.coycontactnumber}</p>
            </div>

            {personData?.[0]?.name && (
              <div className='text-right'>
                <p className='font-semibold'>Sold To</p>
                <p>{personData[0].name}</p>
                <p>{personData[0].address}</p>
                <p>{personData[0].email}</p>
              </div>
            )}
          </div>

          <table className='w-full border border-gray-300 text-sm mt-6'>
            <thead>
              <tr className='bg-gray-100'>
                <th colSpan={3} className='border px-2 py-1 text-left'>
                  Description
                </th>
                <th className='border px-2 py-1 text-center'>Qty</th>
                <th className='border px-2 py-1 text-center'>Unit</th>
                {discountShow && (
                  <th className='border px-2 py-1 text-center'>Disc</th>
                )}
                <th className='border px-2 py-1 text-center'>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((item, i) => (
                <tr key={i}>
                  <td colSpan={3} className='border px-2 py-1'>
                    {item.name || item.packagedesc}
                  </td>
                  <td className='border px-2 py-1 text-center'>
                    {item.amount}
                  </td>
                  <td className='border px-2 py-1 text-center'>
                    ${item.price}
                  </td>
                  {discountShow && (
                    <td className='border px-2 py-1 text-center'>
                      {item.discpercent
                        ? `${item.discount}%`
                        : `-$${item.discount}`}
                    </td>
                  )}
                  <td className='border px-2 py-1 text-center'>
                    ${(item.subPrice * item.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex justify-between items-center mt-6'>
            <div>
              <p className='font-semibold'>Payment Method</p>
              <p>{paymentMethod}</p>
            </div>
            <div className='text-right font-semibold'>
              Total : ${totalPrice}
            </div>
          </div>
        </div>

        <div className='bg-purple-500/50 text-center p-3 text-sm'>
          <p className='font-semibold'>Thank You For Your Purchase</p>
          <p>For questions please contact</p>
          <p>{posSetup?.coyemail}</p>
        </div>
      </div>

      <style>{`
     @media print {
  html, body {
    width: 210mm;
    height: 148mm;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body * {
    visibility: hidden;
  }

  #printreceipt,
  #printreceipt * {
    visibility: visible;
  }

  #printreceipt {
    position: absolute;
    left: 0;
    top: 0;

    width: 210mm;
    height: 148mm;

    padding: 1mm;
    box-sizing: border-box;

    overflow: hidden;

  }

  table {
    font-size: 10px;
    page-break-inside: avoid;
  }
}

@page {
  size: A5 landscape;
  margin: 0;
}

      `}</style>
    </>
  );
}
