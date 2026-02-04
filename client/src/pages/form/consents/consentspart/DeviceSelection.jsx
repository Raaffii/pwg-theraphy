export default function DeviceSelection({
  formData,
  handleChange,
  interestsList,
}) {
  return (
    <div className='mb-4'>
      <p className='font-medium mb-1'>Kindly tick (✔) which device</p>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
        {interestsList?.map((item, index) => (
          <label key={index} className='inline-flex items-center text-sm'>
            <input
              type='checkbox'
              className='mr-2'
              name='selectedDevices'
              value={item.productid}
              checked={formData.selectedDevices.some(
                (d) => d.id === item.productid,
              )}
              onChange={handleChange}
            />
            {item.name}
          </label>
        ))}
      </div>

      {formData.selectedDevices.includes("Others") && (
        <div className='mt-2'>
          <input
            type='text'
            name='otherDevice'
            value={formData.otherDevice}
            onChange={handleChange}
            placeholder='Please specify other device'
            className='border rounded px-2 py-1 w-full md:w-1/2'
          />
        </div>
      )}
    </div>
  );
}
