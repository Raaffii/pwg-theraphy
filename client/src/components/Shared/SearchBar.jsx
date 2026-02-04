export default function SearcBar({ handleSearch }) {
  return (
    <div className='flex w-full max-w-xl'>
      <input
        type='text'
        placeholder='Search'
        className='flex-1 border border-gray-400 border-r-0 rounded-l-2xl px-4 py-2 focus:outline-none'
        onChange={handleSearch}
      />

      <button className='bg-prime-color text-white px-4 py-2 border border-prime-color rounded-r-2xl'>
        Search
      </button>
    </div>
  );
}
