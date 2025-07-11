import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { devices, healthConditions } from "@/utils/Hardcodeddata";
import SignatureCanvas from "react-signature-canvas";
import toast from "react-hot-toast";
import { consentService } from "@/services/consentService";
import { therapistsService } from "@/services/therapistsService";
import { customerService } from "@/services/customerService";
import { interestsService } from "@/services/interestsService";

//partial
import DateAndVoucher from "./consentspart/DateAndVoucher";
import DeviceSelection from "./consentspart/DeviceSelection";
import WalkinReferral from "./consentspart/WalkinReferral";
import PersonalParticulars from "./consentspart/PersonalParticulars";
import HealthDeclaration from "./consentspart/HealthDeclaration";
import Disclaimer from "./consentspart/Disclaimer";
import Signature from "./consentspart/Signature";
import TherapistAndRating from "./consentspart/TherapistAndRating";
import { useAuth } from "@/context/AuthContext";

const CustomerConsentForm = ({ role = "customer" }) => {
  const [extended, setExtended] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [therapistsList, setTherapistsList] = useState([]);
  const [interestsList, setInterestsList] = useState();
  const [personalData, setPersonalData] = useState([]);
  const [dataExist, setDataExist] = useState();
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();
  //Next and Prev handle
  const handleNext = async () => {
    if (role == "customer") {
      //change this ----------------------------------------------------------------------------------------

      try {
        const check = await consentService.getConsentByid(user.customerId);

        const isDataExist = await customerService.getCustomerData();

        if (isDataExist.length > 0) {
          await customerService.updateRegistration(user.customerId, formPersonalData);
        } else {
          await customerService.customerRegistration(user.customerId, formPersonalData);
        }
        let status;
        if (check.length > 0) {
          status = await consentService.consentUpdate(user.customerId, formData);
        } else {
          status = await consentService.consentRegistration(user.customerId, formData);
        }
        if (status.response && status.response.status === 500) {
          toast.error("Someting Is Miss");
          navigate("/steps/consent");
        } else {
          toast.success("Data Saved");
          navigate("/steps/evaluation");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const resp = await customerService.customerRegistration(0, formPersonalData);
        const status = await consentService.consentRegistration(resp.data.data, formData);
        if (status.response && status.response.status === 500) {
          toast.error("Someting Is Miss");
          navigate("/therapist");
        } else {
          toast.success("Data Saved");
          navigate("/therapist");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handlePrev = () => {
    navigate("/steps/personal-data");
  };

  const [formData, setFormData] = useState({
    date: "",
    voucherNo: "",
    selectedDevices: "",
    gender: "",
    selectedConditions: "",
    otherCondition: "",
    signatureDate: "",
    therapist: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePersonal = (e) => {
    const { name, value } = e.target;
    setFormPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------USE EFFECT----------
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const dataTherapist = await therapistsService.therapistsList();
        setTherapistsList(dataTherapist);
        const dataDevice = await interestsService.interestestsList();
        setInterestsList(dataDevice);
        const data = await customerService.getCustomerData();
        setPersonalData(data);
        const dataex = await consentService.getConsentByid(user.customerId);
        setDataExist(dataex);
      } catch (err) {
        // setError("Fail To gain data");
      } finally {
        // setLoading(false);
      }
    };

    fetch();
  }, []);

  //--------------------------- Signature Set Up Start
  const sigCanvas = useRef();

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const saveSignature = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    console.log("Tanda tangan base64:", dataUrl);
  };
  //---------------------------- Signature Set Up End

  useEffect(() => {
    if (dataExist && dataExist.length > 0) {
      setFormData((prev) => ({
        ...prev,
        date: dataExist[0].consentfrmdate ? new Date(dataExist[0].consentfrmdate).toISOString().split("T")[0] : "",
        voucherNo: dataExist[0].voucherno || "",
        selectedDevices: dataExist[0].device_used || "",
        gender: dataExist[0].gender || "",
        selectedConditions: "",
        signatureDate: dataExist[0].consentfrmdate ? new Date(dataExist[0].consentfrmdate).toISOString().split("T")[0] : "",
        therapist: "",
        breastImplant: dataExist[0].implantbreast || 0,
        pacemakerImplant: dataExist[0].implantpacemaker || 0,
        electronicMonitorImplant: dataExist[0].implantelecmon || 0,
        metalImplant: dataExist[0].implantmetal || 0,
        eyeLensImplant: dataExist[0].implanteyslens || 0,
        historyOfHeartBypass: dataExist[0].issueheartbypass || 0,
        walkin: dataExist[0].walkin || "",
        referralType: "",
        nonWalkin: "Walk-in",
        nonWalkinName: dataExist[0].nonwalkinname || "",
        nonWalkinContact: dataExist[0].nonwalkincontact || "",
        others: "",
        otherCondition: dataExist[0].issueothers || 0,
        issuecoheartdisease: dataExist[0].issuecoheartdisease || 0,
        issuelungdisease: dataExist[0].issuelungdisease || 0,
        issuediabetes: dataExist[0].issuediabetes || 0,
        issuestrokehistory: dataExist[0].issuestrokehistory || 0,
        issuehypertension: dataExist[0].issuehypertension || 0,
        issuepregnant: dataExist[0].issuepregnant || 0,
        issuecancer: dataExist[0].issuecancer || 0,
        issuemenstruating: dataExist[0].issuemenstruating || 0,
        issuesurgery: dataExist[0].issuesurgery || 0,
        issuehospitalninetydays: dataExist[0].issuehospitalninetydays || 0,
        issueseizure: dataExist[0].issueseizure || 0,
      }));
    }
  }, [dataExist]);

  useEffect(() => {
    if (personalData && personalData.length > 0) {
      setFormPersonalData((prev) => ({
        ...prev,
        name: personalData[0].name || "",
        contact_no: personalData[0].contact_no || "",
        email: personalData[0].email || "",
        emergency_contact_name: personalData[0].emergency_contact_name || "",
        emergency_contact_no: personalData[0].emergency_contact_no || "",
        dateOfBirth: personalData[0].dateofbirth ? new Date(personalData[0].dateofbirth).toISOString().split("T")[0] : "",
        address: personalData[0].address || "",
        country: personalData[0].country || "",
        postalcode: personalData[0].postalcode || "",
        referred_by: personalData[0].referred_by || "",
        referred_other: personalData[0].referred_other || "",
      }));
    }
  }, [personalData]);

  console.log(formData);
  return (
    <div className='p-6 space-y-3'>
      {/* Header */}
      <h1 className='text-2xl font-bold text-red-700 mb-2'>CUSTOMER CONSENT FORM</h1>
      <p className='text-sm text-gray-500 mb-4'>客户同意书 BORANG KEBENARAN PELANGGAN</p>
      {/* Date and Voucher No */}
      <DateAndVoucher formData={formData} handleChange={handleChange} />
      {/* Device Selection */}
      <DeviceSelection formData={formData} handleChange={handleChange} interestsList={interestsList} />
      {/* Walk-in / Referral */}
      <WalkinReferral formData={formData} handleChange={handleChange} />
      {/* Personal Particulars */}
      <div className='bg-blue-900 text-white px-2 py-1 mb-2 font-semibold'>PERSONAL PARTICULARS 客户信息 BUTIRAN PELANGGAN</div>
      <PersonalParticulars formData={formData} formPersonalData={formPersonalData} handleChange={handleChange} personalData={personalData} handleChangePersonal={handleChangePersonal} />
      {/* Health Declaration */}
      <div className='bg-blue-900 text-white px-2 py-1 mb-2 font-semibold'>HEALTH DECLARATION 健康声明 PENGISYTIHARAN KESIHATAN</div>
      <HealthDeclaration formData={formData} handleChange={handleChange} healthConditions={healthConditions} setFormData={setFormData} />
      {/* Disclaimer */}
      <div className='bg-blue-900 text-white px-2 py-1 mb-2 font-semibold'>DISCLAIMER 客户免责声明 PENAFIAN</div>
      <Disclaimer formData={formData} handleChange={handleChange} personalData={personalData} extended={extended} setExtended={setExtended} Button={Button} />
      {/* Signature & Rating */}
      <Signature formData={formData} handleChange={handleChange} sig={{ saveSignature, clearSignature, sigCanvas, SignatureCanvas }} Button={Button} />
      <TherapistAndRating formData={formData} handleChange={handleChange} therapistsList={therapistsList} />
      <div className='flex justify-between my-10'>
        <Button variant='secondary' onClick={handlePrev}>
          Prev
        </Button>
        <Button onClick={handleNext}>Save</Button>
      </div>
    </div>
  );
};

export default CustomerConsentForm;
