export default function DeviceSelection({ formData, handleChange, interestsList }) {
  return (
    <div className='mb-4'>
      <p className='font-medium mb-1'>Kindly tick (✔) which device</p>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
        {interestsList?.map((item) => (
          <label key={item.id} className='inline-flex items-center'>
            <input type='checkbox' className='mr-2' name='selectedDevices' value={item.productName} checked={formData.selectedDevices == item.productName} onChange={handleChange} />
            {item.productName}
          </label>
        ))}
      </div>

      {formData.selectedDevices.includes("Others") && (
        <div className='mt-2'>
          <input type='text' name='otherDevice' value={formData.otherDevice} onChange={handleChange} placeholder='Please specify other device' className='border rounded px-2 py-1 w-full md:w-1/2' />
        </div>
      )}
    </div>
  );
}
