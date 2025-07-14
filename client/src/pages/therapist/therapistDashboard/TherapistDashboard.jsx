import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { consentService } from "@/services/consentService";
import { useState, useEffect, useRef } from "react";
import Modal from "../../Shared/Modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CustomerConsentForm from "@/pages/customersteps/consents/CustomerConsentForm";
import CustomerEvaluationForm from "@/pages/customersteps/CustomerEvaluationForm";
import { Eye, Trash2, ClipboardPlus, Package } from "lucide-react";
import Pagination from "@/pages/Shared/Pagination";
import { useNavigate } from "react-router-dom";

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [consentList, setConsentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDelete, setSelectedDelete] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [evaluationModal, setEvaluationModal] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0);
  const [selectedEvaluation, setSelectedEvaluation] = useState();
  const [modalActionChoose, setModalActionChoose] = useState(false);

  const consentRef = useRef();

  const menuItems = [
    { label: "Evaluation", color: "bg-purple-600" },
    { label: "Buy Package", color: "bg-blue-600" },
    { label: "Cashier", color: "bg-red-600" },
  ];

  let itemsPerPage = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await consentService.getConsent();
        setConsentList(data);
        console.log(data);
      } catch (err) {
        // setError("Fail To gain data");
      } finally {
        // setLoading(false);
      }
    };

    fetch();
  }, [openModalForm, showModal]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirsItem = indexOfLastItem - itemsPerPage;
  let currentItems = consentList.slice(indexOfFirsItem, indexOfLastItem);

  const pagesChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const totalPages = Math.ceil(consentList.length / itemsPerPage);

  const handleDelete = async (id) => {
    setSelectedDelete(id);
    setOpenModal(true);
  };
  const handleView = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEvaluation = (id) => {
    setSelectedEvaluation(id);
    setEvaluationModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = consentService.deleteById(selectedDelete);
      setConsentList((prev) => prev.filter((item) => item.customerid !== selectedDelete));
      currentItems = consentList.slice(indexOfFirsItem, indexOfLastItem);
    } catch (err) {
      console.log("error deleting", err);
    }
  };

  const handleExternalClick = () => {
    if (consentRef.current) {
      consentRef.current.triggerClick();
      setTriggerKey((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='space-x-2'>
          <select name='' id=''>
            <option value=''>Register</option>
            <option value=''>Consent</option>
            <option value=''>Evaluation</option>
          </select>
          <input type='text' placeholder='search' className='border' />

          <input type='checkbox' />
          <label htmlFor=''> Active only</label>
        </div>
        <Button onClick={() => setOpenModalForm(true)} className='bg-prime-color hover:bg-prime-color-hover'>
          +{" "}
        </Button>

        {openModalForm && (
          <Modal setIsOpen={setOpenModalForm} big={true}>
            <div className='max-h-[600px] overflow-y-auto'>
              <CustomerConsentForm role={"therapist"} />
            </div>
          </Modal>
        )}
      </div>
      {openModal && (
        <Modal title={"Confirm Delete"} setIsOpen={setOpenModal}>
          <Button variant='destructive' onClick={confirmDelete}>
            Delete {selectedDelete}
          </Button>
        </Modal>
      )}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className='text-center'>
            <TableHead className=''>Name</TableHead>
            <TableHead className=''>Gontact</TableHead>
            <TableHead className=''>Gender</TableHead>
            <TableHead className=''>Email</TableHead>
            <TableHead className=''>Selected Device</TableHead>
            <TableHead className=''>Emergancy Contact</TableHead>
            <TableHead className=''>Emergancy Contact Name</TableHead>
            <TableHead className=''>Status</TableHead>
            <TableHead className=''></TableHead>
            <TableHead className=''></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, index) => (
            <TableRow key={index} className='rounded-xl hover:bg-prime-color cursor-pointer ' onClick={() => setModalActionChoose(true)}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.contact_no}</TableCell>
              <TableCell>{item.gender == "Male" ? "M" : "F"}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.device_used}</TableCell>
              <TableCell>{item.emergency_contact_name}</TableCell>
              <TableCell>{item.emergency_contact_no}</TableCell>
              <TableCell className={item.active ? "text-green-600" : "text-red-600"}>{item.active ? "Active" : "Inactive"}</TableCell>
              <TableCell className='flex gap-2'>
                <Eye onClick={() => handleView(item)} className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
                <Trash2 onClick={() => handleDelete(item.customerid)} className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5 ' />
              </TableCell>
              <TableCell className='items-center justify-center gap-2'>
                <ClipboardPlus onClick={() => setModalActionChoose(true)} className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination totalPages={totalPages} pagesChange={pagesChange} currentPage={currentPage} />
      {showModal && selectedItem && (
        <Modal title={"Customer Detail"} setIsOpen={setShowModal} big={true}>
          <div className='max-h-[600px] overflow-y-auto'>
            <h2>View</h2>
            <ConsentForm ref={consentRef} role={"therapist"} idCustomer={selectedItem.customerid} setTriggerKey={setTriggerKey} />
          </div>
        </Modal>
      )}

      {modalActionChoose && (
        <Modal setIsOpen={setModalActionChoose}>
          <div className='grid grid-rows-3  gap-2'>
            <div className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer' onClick={() => navigate("/therapist/evaluation")}>
              <ClipboardPlus className='w-7 h-7' />
              <p className='text-base font-semibold'>Evaluation</p>
            </div>
            <div className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer'>
              <Package className='w-7 h-7' />
              <p className='text-base font-semibold'>Package Buy</p>
            </div>
            <div className='bg-prime-color h-full rounded-2xl flex justify-center text-white p-4 gap-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer'>
              <ClipboardPlus className='w-7 h-7' />
              <p className='text-base font-semibold'>Evaluation</p>
            </div>
          </div>
        </Modal>
      )}
      {/* <div className='grid grid-rows-3 gap-2'>
        {menuItems.map((item, index) => (
          <div key={index} className={`${item.color} h-full rounded-2xl flex flex-col items-center justify-center text-white p-4 gap-2 hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer`}>
            <ClipboardPlus className='w-7 h-7' />
            <p className='text-base font-semibold'>{item.label}</p>
          </div>
        ))}
      </div> */}

      {evaluationModal && (
        <Modal title={"Customer Detail"} setIsOpen={setEvaluationModal} big={true}>
          <div className='max-h-[600px] overflow-y-auto'>
            <h1>evaluation</h1>
            <EvaluationForm id={selectedEvaluation} role={"therapist"} />
          </div>
        </Modal>
      )}
    </>
  );
}
