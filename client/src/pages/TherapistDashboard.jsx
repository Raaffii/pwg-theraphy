import { useState, useEffect, useRef } from "react";
import Modal from "../components/Shared/Modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table";
import CustomerConsentForm from "@/pages/form/consents/CustomerConsentForm";
import { useConsent } from "@/hooks/useConsent";
import { ClipboardPlus, Computer, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearcBar from "@/components/Shared/SearchBar";

export default function TherapistDashboard() {
  const hasFetchedData = useRef(false);
  const navigate = useNavigate();
  const {
    fetchConsent,
    deleteConsent,
    consent,
    pagination,
    onPageChange,
    onPageSizeChange,
    onSearch,
  } = useConsent();

  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalActionChoose, setModalActionChoose] = useState(false);
  const [selectedChoose, setSelectedChoose] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;
        await fetchConsent();
      } catch (err) {
        console.error("Fail to fetch consent data", err);
      }
    };
    fetchData();
  }, [fetchConsent]);

  // Search

  const handleDelete = (item) => {
    setSelectedDelete(item);
    setOpenModalDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteConsent(selectedDelete.customerid);
      setOpenModalDelete(false);
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleChoose = (id) => {
    setSelectedChoose(id);
    setModalActionChoose(true);
  };

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

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cellClassName: "text-left",
    },
    {
      accessorKey: "contact_no",
      header: "Contact",
      cellClassName: "text-left",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cellClassName: "text-left",
      render: (row) => (
        <div className='flex flex-wrap gap-1'>
          <span className={`font-semibold p-1 rounded-sm`}>
            {row.gender === "Male" ? "M" : "F"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cellClassName: "text-left",
    },
    {
      accessorKey: "emergency_contact_no",
      header: "Emergency Contact",
      cellClassName: "text-left",
    },
    {
      accessorKey: "emergency_contact_name",
      header: "Emergency Contact Name",
      cellClassName: "text-left",
    },
    {
      accessorKey: "active",
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
    {
      accessorKey: "-",
      header: "",
      cellClassName: "text-center",
      render: (row) => (
        <div className='flex justify-center flex-wrap gap-1 '>
          <span
            onClick={() => handleChoose(row.customerid)}
            className='cursor-pointer bg-purple-300 p-0.5 text-white border-2 border-purple-400 rounded-md hover:bg-blue-300'>
            <ClipboardPlus width={20} />
          </span>
        </div>
      ),
    },
  ];

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
        <Modal setIsOpen={setOpenModalForm} big={true}>
          <div className='max-h-[600px] overflow-y-auto'>
            <CustomerConsentForm role='therapist' />
          </div>
        </Modal>
      )}

      {openModalDelete && (
        <Modal
          title='Confirm Delete'
          setIsOpen={setOpenModalDelete}
          small={true}>
          <div className='gap-2 flex-row'>
            <p className='my-4'>
              Are You Sure to delete
              <span className='font-semibold'> {selectedDelete.name}</span> ?
            </p>
            <div className='w-full flex justify-end'>
              <Button variant='destructive' onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showModal && selectedItem && (
        <Modal setIsOpen={setShowModal} big={true}>
          <div className='max-h-[600px] overflow-y-auto'>
            <CustomerConsentForm
              role='therapist'
              idCustomer={selectedItem.customerid}
            />
          </div>
        </Modal>
      )}

      {modalActionChoose && (
        <Modal setIsOpen={setModalActionChoose} small={true}>
          <div className='grid grid-rows-3 gap-2'>
            <div
              className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer'
              onClick={() =>
                navigate(`/therapist/evaluation/${selectedChoose}`)
              }>
              <ClipboardPlus className='w-7 h-7' />
              <p className='text-base font-semibold'>Evaluation</p>
            </div>
            <div
              className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer'
              onClick={() => navigate(`/therapist/pos/${selectedChoose}`)}>
              <Computer className='w-7 h-7' />
              <p className='text-base font-semibold'>Point Of Sales</p>
            </div>
            <div
              className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer'
              onClick={() =>
                navigate(`/therapist/transaction/${selectedChoose}`)
              }>
              <History className='w-7 h-7' />
              <p className='text-base font-semibold'>History Of Transaction</p>
            </div>
          </div>
        </Modal>
      )}

      <DataTable
        data={consent}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleView}
        pagination={pagination}
        onPageChange={onPageChange}
        onSizeChange={onPageSizeChange}
      />
    </div>
  );
}
