import { Note } from "@react-pdf/renderer";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { evaluationService } from "@/services/evaluationService";
import { interestsService } from "@/services/interestsService";
import toast from "react-hot-toast";
import BodyPartSelection from "./evaluationpart/BodyPartSelection";

export default function EvaluationForm({ customerData, consentData, setModal }) {
  const [interestsList, setInterestsList] = useState();
  const [coordsFront, setCoordsFront] = useState({ x: 0, y: 0 });
  const [coordsBack, setCoordsBack] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    medication: 0,
    medication_detail: "",
    uncomfortable_pain: "",
    note_session: "",
    therapist: consentData[0]?.therapistid || "",
    theraphy: consentData[0]?.device_used || "",
    date: consentData[0].consentfrmdate ? new Date(consentData[0].consentfrmdate).toISOString().split("T")[0] : "",
    duration: "",
    frontx: coordsFront.x,
    fronty: coordsFront.y,
    backx: coordsBack.x,
    backy: coordsBack.y,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      frontx: coordsFront.x,
      fronty: coordsFront.y,
      backx: coordsBack.x,
      backy: coordsBack.y,
    }));
  }, [coordsFront, coordsBack]);

  const handleChangeEvaluations = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (id) => {
    try {
      console.log(formData);
      const status = await evaluationService.addEvaluation(id, formData);
      if (status.response && status.response.status === 500) {
        toast.error("Someting Is Miss");
      } else {
        toast.success("Data Saved");
        setModal(false);
      }
    } catch (error) {
      toast.error(error.message || "Eror Save Evaluation");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataDevice = await interestsService.interestestsList();
      setInterestsList(dataDevice);
    };

    fetchData();
  }, []);

  return (
    <div className='w-full'>
      <div className=' h-full  mx-auto'>
        <div className='grid lg:grid-cols-3 my-5 mx-5'>
          <BodyPartSelection setCoordsBack={setCoordsBack} setCoordsFront={setCoordsFront} />
          <div className='col-span-2 mt-5 lg:mt-0'>
            {/* PROFILE ? */}
            <div className='grid grid-cols-2'>
              <div className='flex items-center'>
                <div className='mr-7'>
                  <p>Name</p>
                  <p>姓名</p>
                </div>
                <div className='border-b-2 border-blue-500 w-full'>{customerData[0]?.name}</div>
              </div>

              <div className='flex items-center'>
                <div className='mx-7'>
                  <p>DATE</p>
                  <p>日期</p>
                </div>
                <div className='border-b-2 border-blue-500 w-full'>{consentData[0].consentfrmdate ? new Date(consentData[0].consentfrmdate).toISOString().split("T")[0] : ""}</div>
              </div>
            </div>
            {/* LINE SEPARATION ? */}
            <div className='bg-prime-color-two w-full h-2 my-2'></div>
            {/* ANY MEDICATION ? */}
            <div className='grid grid-cols-4 my-2'>
              <div className='flex items-center col-span-3'>
                <div className='mr-7'>
                  <p>Are You In Any Medication ?</p>
                  <p>您正在服用任何药物吗？</p>
                </div>
              </div>

              <div className='flex items-center'>
                <div className='flex mx-3'>
                  <input type='checkbox' name='medications' value={1} onChange={(e) => setFormData({ ...formData, medication: e.target.checked ? 1 : 0 })} checked={formData.medication == 1} />
                  <p>Yes</p>
                </div>
                <div className='flex mx-3'>
                  <input type='checkbox' name='medications' value={0} onChange={(e) => setFormData({ ...formData, medication: e.target.checked ? 0 : 1 })} checked={formData.medication == 0} />
                  <p>No</p>
                </div>
              </div>
            </div>

            <div className='my-2'>
              {formData.medication == 1 && (
                <div className='flex items-center my-5'>
                  <div className='mr-7 w-80'>
                    <p>IF YES WHICH ONES </p>
                    <p>如果有，是哪些</p>
                  </div>
                  <input type='text' className='border-b-2 border-blue-500 w-full  focus:outline-none' name='medication_detail' placeholder='Medication Detail' value={formData.medication_detail} onChange={handleChangeEvaluations} />
                </div>
              )}
              <div className='flex items-center my-5'>
                <div className='mr-7 w-80'>
                  <p>WHERE IS YOUR UNCOMFORTABLE PAIN? </p>
                  <p>你不舒服的疼痛在哪里？</p>
                </div>
                <input type='text' className='border-b-2 border-blue-500 w-full  focus:outline-none' name='uncomfortable_pain' placeholder='Unconfortable Pain' value={formData.uncomfortable_pain} onChange={handleChangeEvaluations} />
              </div>
              <div className='flex items-center my-5'>
                All customer are requested to conduct a brief health assesment before the treatment. Your information will be used to provide you with more customized services, and, we guarantee you the security and confidentiality of the information <br />
                所有顾客请务必在疗程开始前进行简短的健康评估，您的信息将被用于我们为您提供更加定制化的服务，并且我们 向您保证信息的安全性和隐秘性。
              </div>
            </div>
          </div>
        </div>
        <div className=' mx-5 mb-5'>
          <div className='bg-prime-color-two h-2 my-5'></div>
          <div className='flex my-5 gap-10'>
            <p>Therapy 理疗 : {consentData[0]?.device_used}</p>
            <div className='flex'>
              <p>Duration 时长 : </p> <input type='number' name='duration' id='' placeholder='Minute' className='mx-2 focus:outline-none border-b-2 border-blue-500' onChange={handleChangeEvaluations} />
            </div>
            <p>Therapist 理疗师 : {consentData[0]?.therapistid}</p>
          </div>
          <textarea placeholder='Session' className='w-full h-56 bg-gray-100 rounded-3xl px-4 py-2 focus:outline-none resize-none' name='note_session' value={formData.note_session} onChange={handleChangeEvaluations} />
          <div className='flex my-5 gap-10 justify-between'>
            <div className='flex gap-10'>
              <p>Created At : 20/9/2030</p>
              <p>Last Updated : 29/9/2030</p>
            </div>
            <Button className='bg-prime-color' onClick={() => handleSave(customerData[0]?.customerid)}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
