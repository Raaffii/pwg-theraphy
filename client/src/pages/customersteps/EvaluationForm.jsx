import { Note } from "@react-pdf/renderer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EvaluationForm({ data }) {
  const [formData, setFormData] = useState({
    medication: 0,
    medication_detail: "",
    uncomfortable_pain: "",
    note_session: "",
  });

  const handleChangeEvaluations = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {};

  return (
    <div className='w-full'>
      <div className=' h-full  mx-auto'>
        <div className='grid grid-cols-3 my-5 mx-5'>
          <div className='flex justify-center'>
            <img src='/body/front.png' alt='' className='m-2' />
            <img src='/body/back.png' alt='' className='m-2' />
          </div>
          <div className='col-span-2'>
            {/* PROFILE ? */}
            <div className='grid grid-cols-2'>
              <div className='flex items-center'>
                <div className='mr-7'>
                  <p>Name</p>
                  <p>姓名</p>
                </div>
                <div className='border-b-2 border-blue-500 w-full'>{data[0]?.name}</div>
              </div>

              <div className='flex items-center'>
                <div className='mx-7'>
                  <p>DATE</p>
                  <p>日期</p>
                </div>
                <div className='border-b-2 border-blue-500 w-full'>{data[0].dateofbirth ? new Date(data[0].dateofbirth).toISOString().split("T")[0] : ""}</div>
              </div>
            </div>
            {/* LINE SEPARATION ? */}
            <div className='bg-prime-color w-full h-2 my-2'></div>
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
          <div className='bg-prime-color h-2 my-5'></div>
          <div className='flex my-5 gap-10'>
            <p>Therapy 理疗 : 7 Wonder</p>
            <p>Duration 时长 : 90 Minute</p>
            <p>Therapist 理疗师 : Tomiyasu</p>
          </div>
          <textarea placeholder='Session' className='w-full h-56 bg-gray-100 rounded-3xl px-4 py-2 focus:outline-none resize-none' name='note_session' value={formData.note_session} onChange={handleChangeEvaluations} />
          <div className='flex my-5 gap-10 justify-between'>
            <div className='flex gap-10'>
              <p>Created At : 20/9/2030</p>
              <p>Last Updated : 29/9/2030</p>
            </div>
            <Button className='bg-prime-color' onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
