import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Pencil } from "lucide-react";
import Modal from "@/components/Shared/Modal";
import { Button } from "@/components/ui/button";
import EvaluationForm from "@/pages/form/evaluation/EvaluationForm";
import { useNavigate } from "react-router-dom";
import CustomerConsentForm from "@/pages/form/consents/CustomerConsentForm";
import { useEvaluation } from "@/hooks/useEvaluation";
import { DataTable } from "@/components/table";
//utils
import { calculateAge } from "@/utils/calculateAges";
import { useConsent } from "@/hooks/useConsent";

export default function PatienTreatment() {
  const navigate = useNavigate();

  const {
    evaluation,
    fetchEvaluationById,
    pagination,
    onPageChange,
    onPageSizeChange,
    setParams,
    deleteEvaluation,
  } = useEvaluation();

  const { fetchConsentById, consent } = useConsent();

  const [modalPlus, setModalPlus] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEditConsent, setModalEditConsent] = useState(false);

  const [viewData, setViewData] = useState({});
  const [deleteData, setDeleteData] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();

  const [age, setAge] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const resp = await fetchConsentById(id);

      const yearsold = calculateAge(resp.data?.dateOfBirth);
      setAge(yearsold);

      setParams({ customerId: id });
      await fetchEvaluationById({ customerId: id });
    };

    fetchData(id);
  }, []);

  const handleView = (data) => {
    setModalView(true);
    setViewData(data);
  };

  const handleDelete = (item) => {
    setModalDelete(true);
    setDeleteData(item.evaluation_id);
  };

  const handleConsent = (id) => {
    setModalEditConsent(true);
    setSelectedCustomer(id);
  };

  const confirmDelete = async (id) => {
    await deleteEvaluation(id);
    setModalDelete(false);
  };

  const columns = [
    {
      accessorKey: "date",
      header: "Consent Form Date",
      cellClassName: "text-left",
      render: (row) => (
        <div className='flex flex-wrap gap-1'>
          <span className={` p-1 rounded-sm`}>
            {new Date(row.consentfrmdate).toLocaleString().split("")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "device_used",
      header: "Theraphy",
      cellClassName: "text-left",
    },
  ];

  const dataConsent = consent ? [consent] : [];

  return (
    <div>
      <p
        className='text-blue-600 hover:underline my-2 cursor-pointer'
        onClick={() => navigate("/therapist")}>
        &larr;Back
      </p>
      <div className='grid lg:grid-cols-2 gap-5 items-center'>
        <div className='mb-4'>
          <h1 className='text-2xl font-semibold text-gray-800'>
            Evaluation Page
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Evaluation See Patient Progress
          </p>
        </div>

        <div className='border border-gray-300 shadow-md rounded-lg p-2'>
          <div className='flex flex-col sm:flex-row justify-between gap-2 sm:items-center'>
            <div className='flex flex-wrap gap-x-4 gap-y-1 text-sm'>
              <p>Name: {consent?.name || ""}</p>
              <p>Age: {age || ""}</p>
              <p>Contact: {consent?.contact_no || ""}</p>
            </div>
            <Pencil
              className='cursor-pointer hover:text-blue-600 transition duration-200 text-gray-500 w-5'
              onClick={() => handleConsent(consent?.customerid)}
            />
          </div>
        </div>
      </div>
      <div className='border border-gray-300 shadow-md rounded-2xl mt-5 '>
        <div className='justify-between w-full flex'>
          <h2 className='m-5'>Evaluation</h2>{" "}
          <Button
            className='bg-prime-color hover:bg-prime-color-hover m-5'
            onClick={() => setModalPlus(true)}>
            +{" "}
          </Button>
        </div>

        <DataTable
          data={dataConsent}
          columns={columns}
          pagination={pagination}
          onPageChange={onPageChange}
          onSizeChange={onPageSizeChange}
          onDelete={handleDelete}
          onEdit={handleView}
        />
      </div>
      {modalPlus && (
        <Modal setIsOpen={setModalPlus} big={true}>
          {" "}
          <div className='max-h-[600px] overflow-y-auto'>
            <EvaluationForm
              consent={consent}
              setModal={setModalPlus}
              fetchEvaluationById={fetchEvaluationById}
            />
          </div>
        </Modal>
      )}{" "}
      {modalView && (
        <Modal setIsOpen={setModalView} big={true}>
          {" "}
          <div className='max-h-[600px] overflow-y-auto'>
            <EvaluationForm
              consent={consent}
              setModal={setModalView}
              data={viewData}
              fetchEvaluationById={fetchEvaluationById}
            />
          </div>
        </Modal>
      )}
      {modalDelete && (
        <Modal title={"Confirm Delete"} setIsOpen={setModalDelete} small={true}>
          <Button
            variant='destructive'
            onClick={() => confirmDelete(deleteData)}>
            Delete {deleteData}
          </Button>
        </Modal>
      )}
      {modalEditConsent && (
        <Modal setIsOpen={setModalEditConsent} big={true}>
          <div className='max-h-[600px] overflow-y-auto'>
            <CustomerConsentForm
              role={"therapist"}
              idCustomer={selectedCustomer}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
