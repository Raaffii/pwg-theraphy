export default function WalkinReferral({ formData, handleChange }) {
  return (
    <div className='mb-4'>
      <div className='flex gap-6'>
        <label className='inline-flex items-center cursor-pointer'>
          <input
            type='radio'
            name='walkin'
            value='1'
            checked={formData.walkin == "1"}
            onChange={handleChange}
            className='mr-2'
          />
          Walk-in
        </label>

        <label className='inline-flex items-center cursor-pointer'>
          <input
            type='radio'
            name='walkin'
            value='0'
            checked={formData.walkin == "0"}
            onChange={handleChange}
            className='mr-2'
          />
          Referral / Sponsor Up-line / Associate
        </label>
      </div>

      {formData.walkin == "0" && (
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full'>
          <select
            name='nonWalkin'
            value={formData.nonWalkin}
            onChange={handleChange}
            className='border rounded px-3 py-2'>
            <option value=''>Choose</option>
            <option value='Walk-in'>Walk-in</option>
            <option value='Referral'>Referral</option>
            <option value='Sponsor'>Sponsor</option>
            <option value='Associate'>Associate</option>
          </select>

          <input
            type='text'
            name='nonWalkinName'
            value={formData.nonWalkinName}
            onChange={handleChange}
            placeholder='Name'
            className='border rounded px-3 py-2'
          />

          <input
            type='text'
            name='nonWalkinContact'
            value={formData.nonWalkinContact}
            onChange={handleChange}
            placeholder='Mobile No.'
            className='border rounded px-3 py-2'
          />
        </div>
      )}
    </div>
  );
}
