import { useState, useEffect, useRef } from "react";
import Modal from "../components/Shared/Modal";
import { Button } from "@/components/ui/button";
import AddProduct from "../components/Product/AddProduct";

import SearcBar from "@/components/Shared/SearchBar";
import { useProduct } from "@/hooks/useProduct";
import { DataTable } from "../components/table";

export default function ProductsPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const {
    fetchProduct,
    product,
    deleteProduct,
    pagination,
    onPageChange,
    onPageSizeChange,
    onSearch,
    isLoading,
  } = useProduct();
  const hasFetchedData = useRef(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch product
  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
    const fetch = async () => {
      await fetchProduct();
    };
    fetch();
  }, [fetchProduct]);

  // Search

  const handleDelete = (item) => {
    setSelectedDelete(item.productid);
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

  const columns = [
    {
      accessorKey: "name",
      header: "Picture",
      cellClassName: "text-left",
      render: (row) => (
        <span>
          {row.picture ? (
            <img
              src={row.picture ? `${API_URL}/uploads/${row.picture}` : ""}
              className='w-14 h-14 object-cover rounded-lg'
            />
          ) : (
            "No-Picture"
          )}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cellClassName: "text-left",
    },
    {
      accessorKey: "productcat",
      header: "Category",
      cellClassName: "text-left",
    },
    {
      accessorKey: "unitprice",
      header: "Unit Price",
      cellClassName: "text-left",
      render: (row) => <span>${row.unitprice}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cellClassName: "text-left",
      render: (row) => (
        <div className='flex flex-wrap gap-1'>
          <span className={row.active ? "text-green-600" : "text-red-600"}>
            {row.active ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
  ];

  const searchTimeout = useRef(null);

  const handleSearch = (searchTerm) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        await onSearch(searchTerm);
      }
    }, 1000);
  };

  return (
    <div className='p-4'>
      {/* Top bar */}
      <div className='flex justify-between items-center mb-4'>
        <SearcBar handleSearch={(e) => handleSearch(e.target.value)} />
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
            <AddProduct
              setOpen={setOpenModalForm}
              fetchProduct={fetchProduct}
            />
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
              fetchProduct={fetchProduct}
            />
          </div>
        </Modal>
      )}

      {/* Table */}

      <DataTable
        data={product}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleView}
        pagination={pagination}
        onPageChange={onPageChange}
        onSizeChange={onPageSizeChange}
        isLoading={isLoading}
      />
    </div>
  );
}
