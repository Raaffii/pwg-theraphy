import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { consentService } from "@/services/consentService";
import { useState, useEffect } from "react";
import Modal from "../../components/Shared/Modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ConsentsList() {
  const [consentList, setConsentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDelete, setSelectedDelete] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
  }, []);

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

  const confirmDelete = async () => {
    try {
      const response = consentService.deleteById(selectedDelete);
      setConsentList((prev) =>
        prev.filter((item) => item.customerid !== selectedDelete),
      );
      currentItems = consentList.slice(indexOfFirsItem, indexOfLastItem);
    } catch (err) {
      console.log("error deleting", err);
    }
  };

  return (
    <>
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
            <TableHead className='text-center'>Name</TableHead>
            <TableHead className='text-center'>Gender</TableHead>
            <TableHead className='text-center'>Email</TableHead>
            <TableHead className='text-center'>Selected Device</TableHead>
            <TableHead className='text-center'>Emergancy Contact</TableHead>
            <TableHead className='text-center'>
              Emergancy Contact Name
            </TableHead>
            <TableHead className='text-center'>Therapist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, index) => (
            <TableRow key={index} className='text-center'>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.device_used}</TableCell>
              <TableCell>{item.emergency_contact_name}</TableCell>
              <TableCell>{item.emergency_contact_no}</TableCell>
              <TableCell>{item.therapistid}</TableCell>
              <TableCell>
                <button onClick={() => handleView(item)}>View</button>
                <br />
                <button onClick={() => handleDelete(item.customerid)}>
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex gap-2 mt-4'>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => pagesChange(i + 1)}
            className={`w-10 h-10 flex items-center justify-center border rounded ${currentPage === i + 1 ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            {i + 1}
          </button>
        ))}
      </div>
      {showModal && selectedItem && (
        <Modal title={"Customer Detail"} setIsOpen={setShowModal} big={true}>
          <h2 className='text-lg font-bold mb-2'>Detail Customer</h2>
          <p>{selectedItem.name}</p>
          <p>Customer ID: {selectedItem.customerid}</p>
          <p>Therapist ID: {selectedItem.therapistid}</p>
          <p>Country : {selectedItem.country}</p>
          <p>Health Issue</p>
          <p>{selectedItem.implantbreast != 0 && "implant breast"}</p>
          <p>
            {selectedItem.implantelecmon != 0 && "implant electron monitor"}
          </p>
          <p>{selectedItem.implanteyslens != 0 && "implant eye lens"}</p>
          <p>{selectedItem.implantmetal != 0 && "implant metal"}</p>
          {/* Tambahkan field lain sesuai kebutuhan */}
          <Button
            onClick={() => setShowModal(false)}
            className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
            Close
          </Button>
        </Modal>
      )}
    </>
  );
}
