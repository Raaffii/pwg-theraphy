import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { healthConditions } from "@/utils/Hardcodeddata";

import toast from "react-hot-toast";

// service
import { consentService } from "@/services/consentService";
import { therapistsService } from "@/services/therapistsService";
import { customerService } from "@/services/customerService";
import { interestsService } from "@/services/interestsService";

// hook
import useInitializeConsentForm from "@/hooks/useInitializeConsentForm";
import useInitializeCustomerForm from "@/hooks/useInitializeCustomerForm";
import TherapistAndRating from "./consentspart/TherapistAndRating";
// partial
import DateAndVoucher from "./consentspart/DateAndVoucher";
import DeviceSelection from "./consentspart/DeviceSelection";
import WalkinReferral from "./consentspart/WalkinReferral";
import PersonalParticulars from "./consentspart/PersonalParticulars";
import HealthDeclaration from "./consentspart/HealthDeclaration";

import { useAuth } from "@/context/AuthContext";

const CustomerConsentForm = (props) => {
  const hasFetchedData = useRef(false);
  const {
    role = "customer",
    idCustomer = 0,
    outsave = false,
    setTriggerKey,
  } = props;

  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [loadings, setLoadings] = useState(false);

  const [therapistsList, setTherapistsList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [consentData, setConsentData] = useState([]);

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

      let targetId = role === "customer" ? user.customerId : idCustomer;

      const customerExist = await customerService.getCustomerData(targetId);
      const consentExist = await consentService.getConsentByid(targetId);

      console.log("cistomer exist", consentExist, customerExist);

      if (customerExist.length > 0) {
        console.log("update update");
        await customerService.updateRegistration(targetId, formPersonalData);
      } else {
        console.log("insert insert");
        const resp = await customerService.customerRegistration(
          role === "customer" ? user.customerId : 0,
          formPersonalData,
        );

        if (role !== "customer") {
          targetId = resp.data.data;
        }
      }

      let status;

      if (consentExist?.length > 0 || consentExist) {
        console.log("update update");
        status = await consentService.consentUpdate(
          consentData.consentfrmid,
          formData,
        );
      } else {
        console.log("insert insert");
        status = await consentService.consentRegistration(targetId, formData);
      }

      if (status?.response?.status === 500) {
        toast.error("Something is missing");
        return;
      }

      toast.success("Data saved successfully");

      if (role === "customer") {
        navigate("/steps/evaluation");
      } else {
        navigate(`/therapist/evaluation/${targetId}`);
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

    const selectedItem = interestsList.find((item) => item.productid === value);

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
        const [therapists, devices] = await Promise.all([
          therapistsService.therapistsList(),
          interestsService.interestestsList(),
        ]);

        setTherapistsList(therapists);
        setInterestsList(devices);

        const targetId = idCustomer === 0 ? user.customerId : idCustomer;

        if (targetId) {
          const customer = await customerService.getCustomerData(targetId);
          const consent = await consentService.getConsentByid(targetId);

          setPersonalData(customer);
          setConsentData(consent);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user, idCustomer]);

  useInitializeConsentForm(consentData, setFormData);
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
        interestsList={interestsList}
      />

      <WalkinReferral formData={formData} handleChange={handleChange} />

      <div className='bg-blue-900 text-white px-2 py-1 font-semibold'>
        PERSONAL PARTICULARS
      </div>

      <PersonalParticulars
        formData={formData}
        formPersonalData={formPersonalData}
        handleChange={handleChange}
        handleChangePersonal={handleChangePersonal}
      />

      <div className='bg-blue-900 text-white px-2 py-1 font-semibold'>
        HEALTH DECLARATION
      </div>

      <HealthDeclaration
        formData={formData}
        handleChange={handleChange}
        healthConditions={healthConditions}
        setFormData={setFormData}
      />

      {/* <div className='bg-blue-900 text-white px-2 py-1 font-semibold'>
        DISCLAIMER
      </div>

      <Disclaimer
        formData={formData}
        handleChange={handleChange}
        extended={extended}
        setExtended={setExtended}
        Button={Button}
      /> */}
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
