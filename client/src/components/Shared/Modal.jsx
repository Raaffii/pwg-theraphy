import { Title } from "@radix-ui/react-dialog";

export default function Modal({
  children,
  title = "",
  setIsOpen,
  small = false,
}) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={() => setIsOpen(false)}>
      <div
        className={`bg-white rounded-xl p-6 ${small ? "lg:w-1/5" : "w-4/5"}`}
        onClick={(e) => e.stopPropagation()}>
        <div className='mb-4 flex w-full items-center justify-between'>
          <div>{title && <h2 className='text-lg font-bold'>{title}</h2>}</div>

          <button
            type='button'
            className='text-xl font-bold text-gray-500 hover:text-red-500'
            onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
//
// className={`${big ? "bg-white p-6 rounded-3xl shadow-lg w-1/2 mt-5 " : "bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"}`}
