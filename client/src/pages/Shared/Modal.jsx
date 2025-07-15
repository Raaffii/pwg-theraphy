import { Title } from "@radix-ui/react-dialog";

export default function Modal({ children, title, setIsOpen, small = false }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={() => setIsOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className={`${small ? "bg-white rounded-xl w-1/5 p-6" : "bg-white p-6 rounded-xl w-4/5"}`}>
        {title && <h2 className='text-lg font-bold mb-4'>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
//
// className={`${big ? "bg-white p-6 rounded-3xl shadow-lg w-1/2 mt-5 " : "bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"}`}
