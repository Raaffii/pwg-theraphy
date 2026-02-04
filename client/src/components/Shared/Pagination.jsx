const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='flex items-center gap-3'>
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        }`}>
        Prev
      </button>

      {/* Page Info */}
      <span className='text-sm text-gray-600'>
        Page <span className='font-semibold'>{currentPage}</span> of{" "}
        <span className='font-semibold'>{totalPages}</span>
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100"
        }`}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
