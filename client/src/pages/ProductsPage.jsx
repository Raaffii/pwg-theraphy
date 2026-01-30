import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import Modal from "./Shared/Modal";
import { Button } from "@/components/ui/button";
import AddProduct from "./Product/AddProduct";
import { Eye, Trash2, ClipboardPlus, Computer, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearcBar from "@/pages/Shared/SearchBar";
import { useProduct } from "@/hooks/useProduct";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { fetchProduct, product, deleteProduct } = useProduct();

  const [filteredList, setFilteredList] = useState([]);
  const [currentDataShow, setCurrentDataShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalActionChoose, setModalActionChoose] = useState(false);
  const [selectedChoose, setSelectedChoose] = useState(null);

  // Fetch product
  useEffect(() => {
    const fetch = async () => {
      await fetchProduct();
    };
    fetch();
  }, []);

  // Update filteredList saat product berubah
  useEffect(() => {
    setFilteredList(product);
    setCurrentPage(1);
  }, [product]);

  // Update currentDataShow saat filteredList atau currentPage berubah
  useEffect(() => {
    const pageTotal = Math.ceil(filteredList.length / itemsPerPage) || 1;
    setTotalPages(pageTotal);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentDataShow(filteredList.slice(start, end));
  }, [filteredList, currentPage]);

  // Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = product.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.productcat.toLowerCase().includes(value),
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setSelectedDelete(id);
    setOpenModalDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedDelete);
      setOpenModalDelete(false);
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
  };

  const handleChoose = (id) => {
    setSelectedChoose(id);
    setModalActionChoose(true);
  };

  return (
    <div className='p-4'>
      {/* Top bar */}
      <div className='flex justify-between items-center mb-4'>
        <SearcBar handleSearch={handleSearch} />
        <Button
          onClick={() => setOpenModalForm(true)}
          className='bg-prime-color hover:bg-prime-color-hover'>
          + Add
        </Button>
      </div>

      {/* Modals */}
      {openModalForm && (
        <Modal setIsOpen={setOpenModalForm} title='Add Product' small>
          <div className='max-h-[600px] overflow-y-auto'>
            <AddProduct setOpen={setOpenModalForm} />
          </div>
        </Modal>
      )}

      {openModalDelete && (
        <Modal setIsOpen={setOpenModalDelete} title='Confirm Delete' small>
          <Button variant='destructive' onClick={confirmDelete}>
            Delete {selectedDelete}
          </Button>
        </Modal>
      )}

      {selectedItem && (
        <Modal
          setIsOpen={() => setSelectedItem(null)}
          title='Edit Product'
          small>
          <div className='max-h-[600px] overflow-y-auto'>
            <AddProduct
              selectedItem={selectedItem}
              mode='edit'
              setOpen={() => setSelectedItem(null)}
            />
          </div>
        </Modal>
      )}

      {modalActionChoose && (
        <Modal setIsOpen={setModalActionChoose} small>
          <div className='grid grid-rows-3 gap-2'>
            <div
              className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 cursor-pointer'
              onClick={() =>
                navigate(`/therapist/evaluation/${selectedChoose}`)
              }>
              <ClipboardPlus className='w-7 h-7' />
              <p className='text-base font-semibold'>Evaluation</p>
            </div>
            <div
              className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 cursor-pointer'
              onClick={() => navigate(`/therapist/pos/${selectedChoose}`)}>
              <Computer className='w-7 h-7' />
              <p className='text-base font-semibold'>Point Of Sales</p>
            </div>
            <div
              className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 cursor-pointer'
              onClick={() =>
                navigate(`/therapist/transaction/${selectedChoose}`)
              }>
              <History className='w-7 h-7' />
              <p className='text-base font-semibold'>History Of Transaction</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Table */}
      <Table>
        <TableCaption>Product List</TableCaption>
        <TableHeader>
          <TableRow className='text-center'>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDataShow.map((item, index) => (
            <TableRow
              key={index}
              className='rounded-xl hover:bg-prime-color cursor-pointer'>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.productcat}</TableCell>
              <TableCell>{item.unitprice}</TableCell>
              <TableCell
                className={item.active ? "text-green-600" : "text-red-600"}>
                {item.active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className='flex gap-2'>
                <Eye
                  onClick={() => handleView(item)}
                  className='cursor-pointer hover:text-blue-600 w-5'
                />
                <Trash2
                  onClick={() => handleDelete(item.productid)}
                  className='cursor-pointer hover:text-blue-600 w-5'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className='flex gap-4 mt-4  items-center'>
        {/* Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className='bg-white shadow-lg px-3 py-1 border border-purple-500 rounded-md hover:bg-purple-100 transition'>
          Prev
        </button>

        {/* Info current page */}
        <span className='text-gray-700'>
          Page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='bg-white shadow-lg px-3 py-1 border border-purple-500 rounded-md hover:bg-purple-100 transition'>
          Next
        </button>
      </div>
    </div>
  );
}
