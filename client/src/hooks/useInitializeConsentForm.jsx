import { useEffect } from "react";

export default function useInitializeConsentForm(data, setFormData) {
  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        date: data.consentfrmdate
          ? new Date(data.consentfrmdate).toISOString().split("T")[0]
          : "",
        voucherNo: data.voucherno || "",
        selectedDevices: data.selectedDevices || [],
        gender: data.gender || "",
        selectedConditions: "",
        signatureDate: data.consentfrmdate
          ? new Date(data.consentfrmdate).toISOString().split("T")
          : "",
        therapist: "1",
        breastImplant: data.implantbreast || 0,
        pacemakerImplant: data.implantpacemaker || 0,
        electronicMonitorImplant: data.implantelecmon || 0,
        metalImplant: data.implantmetal || 0,
        eyeLensImplant: data.implanteyslens || 0,
        historyOfHeartBypass: data.issueheartbypass || 0,
        walkin: data.walkin || "",
        referralType: "",
        nonWalkin: "Walk-in",
        nonWalkinName: data.nonwalkinname || "",
        nonWalkinContact: data.nonwalkincontact || "",
        others: "",
        otherCondition: data.issueothers || 0,
        issuecoheartdisease: data.issuecoheartdisease || 0,
        issuelungdisease: data.issuelungdisease || 0,
        issuediabetes: data.issuediabetes || 0,
        issuestrokehistory: data.issuestrokehistory || 0,
        issuehypertension: data.issuehypertension || 0,
        issuepregnant: data.issuepregnant || 0,
        issuecancer: data.issuecancer || 0,
        issuemenstruating: data.issuemenstruating || 0,
        issuesurgery: data.issuesurgery || 0,
        issuehospitalninetydays: data.issuehospitalninetydays || 0,
        issueseizure: data.issueseizure || 0,
      }));
    }
  }, [data]);
}
