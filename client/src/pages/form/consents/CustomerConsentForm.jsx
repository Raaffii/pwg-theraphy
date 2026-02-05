import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { healthConditions } from "@/utils/Hardcodeddata";
import toast from "react-hot-toast";
// service

// hook
import useInitializeConsentForm from "@/hooks/useInitializeConsentForm";
import useInitializeCustomerForm from "@/hooks/useInitializeCustomerForm";
import { useConsent } from "@/hooks/useConsent";
import { useProduct } from "@/hooks/useProduct";
import { useCustomer } from "@/hooks/useCustomer";
// import TherapistAndRating from "./consentspart/TherapistAndRating";
// partial
import DateAndVoucher from "./consentspart/DateAndVoucher";
import DeviceSelection from "./consentspart/DeviceSelection";
import WalkinReferral from "./consentspart/WalkinReferral";
import PersonalParticulars from "./consentspart/PersonalParticulars";
import HealthDeclaration from "./consentspart/HealthDeclaration";

import { useAuth } from "@/context/AuthContext";
import PropTypes from "prop-types";
import Disclaimer from "./consentspart/Disclaimer";

const CustomerConsentForm = (props) => {
  const hasFetchedData = useRef(false);
  const {
    role = "customer",
    idCustomer,
    outsave = false,
    setTriggerKey,
  } = props;

  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [loadings, setLoadings] = useState(false);
  const { createConsent, updateConsent, fetchConsentByCustomerId, consent } =
    useConsent();

  const { fetchProduct, product } = useProduct();
  const {
    createCustomer,
    customer: personalData,
    updateCustomer,
    fetchCustomerDataById,
  } = useCustomer();

  const [formData, setFormData] = useState({
    date: "",
    voucherNo: "",
    selectedDevices: [],
    gender: "",
    selectedConditions: "",
    otherCondition: "",
    signatureDate: "",
    therapist: 1,
    breastImplant: 0,
    pacemakerImplant: 0,
    electronicMonitorImplant: 0,
    metalImplant: 0,
    eyeLensImplant: 0,
    historyOfHeartBypass: 0,
    walkin: 1,
    referralType: "",
    nonWalkin: "Walk-in",
    nonWalkinName: "",
    nonWalkinContact: "",
    others: "",
    issuecoheartdisease: 0,
    issuelungdisease: 0,
    issuediabetes: 0,
    issuestrokehistory: 0,
    issuehypertension: 0,
    issuepregnant: 0,
    issuecancer: 0,
    issuemenstruating: 0,
    issuesurgery: 0,
    issuehospitalninetydays: 0,
    issueseizure: 0,
  });

  const [formPersonalData, setFormPersonalData] = useState({
    name: "",
    age: "",
    contact_no: "",
    email: "",
    dateOfBirth: "",
    emergency_contact_name: "",
    emergency_contact_no: "",
    address: "",
    country: "",
    postalcode: "",
    referred_by: "",
    referred_other: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePersonal = (e) => {
    const { name, value } = e.target;
    setFormPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    try {
      setLoadings(true);

      let customerId = role === "customer" ? user.customerId : idCustomer;

      if (idCustomer) {
        await updateCustomer(customerId, formPersonalData);
      } else {
        const resp = await createCustomer(
          role === "customer" ? user.customerId : 0,
          formPersonalData,
        );

        if (role !== "customer") {
          customerId = resp.data.data;
        }
      }

      let status;

      if (idCustomer) {
        status = await updateConsent(consent.consentfrmid, formData);
      } else {
        status = await createConsent(customerId, formData);
      }

      if (status?.response?.status === 500) {
        toast.error("Something is missing");
        return;
      }

      if (role === "customer") {
        navigate("/steps/evaluation");
      } else {
        navigate(`/therapist/evaluation/${customerId}`);
        setTriggerKey?.((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoadings(false);
    }
  };

  const handleDeviceChange = (e) => {
    const value = Number(e.target.value);

    const selectedItem = product.find((item) => item.productid === value);

    setFormData((prev) => {
      const exists = prev.selectedDevices.some((item) => item.id === value);

      return {
        ...prev,
        selectedDevices: exists
          ? prev.selectedDevices.filter((item) => item.id !== value)
          : [
              ...prev.selectedDevices,
              {
                id: value,
                name: selectedItem?.name || null,
              },
            ],
      };
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
    if (!user) return;

    const fetchData = async () => {
      try {
        fetchProduct({ filter: "Service" });

        const customerId = idCustomer === 0 ? user.customerId : idCustomer;

        if (customerId) {
          await fetchCustomerDataById(customerId);
          await fetchConsentByCustomerId(customerId);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [
    user,
    idCustomer,
    fetchProduct,
    fetchConsentByCustomerId,
    fetchCustomerDataById,
  ]);

  useInitializeConsentForm(consent, setFormData);
  useInitializeCustomerForm(personalData, setFormPersonalData);

  if (loading) {
    return <div className='p-10 text-center'>Loading...</div>;
  }

  return (
    <div className='p-6 space-y-3'>
      <h1 className='text-2xl font-bold text-red-700 mb-2'>
        CUSTOMER CONSENT FORM
      </h1>

      <DateAndVoucher formData={formData} handleChange={handleChange} />

      <DeviceSelection
        formData={formData}
        handleChange={handleDeviceChange}
        productService={product}
      />

      <WalkinReferral formData={formData} handleChange={handleChange} />

      <div className='bg-prime-color text-white px-2 py-1 font-semibold'>
        PERSONAL PARTICULARS
      </div>

      <PersonalParticulars
        formData={formData}
        formPersonalData={formPersonalData}
        handleChange={handleChange}
        handleChangePersonal={handleChangePersonal}
      />

      <div className='bg-prime-color text-white px-2 py-1 font-semibold'>
        HEALTH DECLARATION
      </div>

      <HealthDeclaration
        formData={formData}
        handleChange={handleChange}
        healthConditions={healthConditions}
        setFormData={setFormData}
      />

      <div className='bg-prime-color text-white px-2 py-1 font-semibold'>
        DISCLAIMER
      </div>

      <Disclaimer
        formPersonalData={formPersonalData}
        handleChange={handleChange}
        Button={Button}
        personalData={personalData}
      />
      {/* 
      <Signature
        formData={formData}
        handleChange={handleChange}
        sig={{ saveSignature, clearSignature, sigCanvas, SignatureCanvas }}
        Button={Button}
      /> */}

      {/* <TherapistAndRating
        formData={formData}
        handleChange={handleChange}
        therapistsList={therapistsList}
      /> */}
      <div className='bg-blue-900 text-white px-2 py-1 font-semibold'></div>
      {!outsave && (
        <div className='flex justify-end my-10'>
          {/* <Button variant='secondary' onClick={handlePrev}>
            Prev
          </Button> */}

          <Button onClick={handleNext} disabled={loadings}>
            {loadings ? "Saving..." : "Save"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerConsentForm;

CustomerConsentForm.propTypes = {
  role: PropTypes.string,
  idCustomer: PropTypes.number,
  outsave: PropTypes.bool,
  setTriggerKey: PropTypes.func,
};
