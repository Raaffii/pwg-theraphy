import { set } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Dot, Eraser, X } from "lucide-react";

export default function BodyPartSelection({ setCoordsBack, setCoordsFront, coordsFront, coordsBack, data }) {
  const [frontModal, setFrontModal] = useState([]);
  const [backModal, setBackModal] = useState([]);

  const canvasRefFront = useRef(null);
  const canvasRefBack = useRef(null);

  useEffect(() => {
    const canvasFront = canvasRefFront.current;
    const ctxFront = canvasFront.getContext("2d");

    const canvasBack = canvasRefBack.current;
    const ctxBack = canvasBack.getContext("2d");

    const imgFront = new Image();
    imgFront.src = "/body/front.png";

    const imgBack = new Image();
    imgBack.src = "/body/back.png";

    const imgWidth = 150;
    const imgHeight = 350;

    imgFront.onload = () => {
      const centerX = (canvasFront.width - imgWidth) / 2;
      const centerY = (canvasFront.height - imgHeight) / 2;
      ctxFront.drawImage(imgFront, centerX, centerY, imgWidth, imgHeight);
    };

    imgBack.onload = () => {
      const centerX = (canvasBack.width - imgWidth) / 2;
      const centerY = (canvasBack.height - imgHeight) / 2;
      ctxBack.drawImage(imgBack, centerX, centerY, imgWidth, imgHeight);
    };
  }, []);

  useEffect(() => {
    data?.anotate.forEach((item, index) => {
      if (item.bodyimageid == 1) {
        console.log("muassooook");
        const newCoords = { x: item.x_percent, y: item.y_percent, ket: item.bodyimagenotes };
        setCoordsFront((prev) => [...prev, newCoords]);
      } else if (item.bodyimageid == 0) {
        const newCoords = { x: item.x_percent, y: item.y_percent, ket: item.bodyimagenotes };
        setCoordsBack((prev) => [...prev, newCoords]);
      }
    });
  }, []);

  const handleMouseMove = (e) => {
    const canvas = canvasRefFront.current;
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
  };

  const handleClick = async (e, position) => {
    let canvas, img;
    if (position == "front") {
      canvas = canvasRefFront.current;
      const imgFront = new Image();
      imgFront.src = "/body/front.png";
      img = imgFront;
    } else if (position == "back") {
      canvas = canvasRefBack.current;
      const imgBack = new Image();
      imgBack.src = "/body/back.png";
      img = imgBack;
    }

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    // Hitung posisi klik relatif terhadap canvas
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    // Draw Red Dot
    // ctx.beginPath();
    // ctx.arc(x, y, 4, 0, 2 * Math.PI); // radius 4px
    // ctx.fillStyle = "red";
    // ctx.fill();

    if (position == "front") {
      const newCoords = { x: x, y: y };
      setCoordsFront((prev) => [...prev, newCoords]);
    } else if (position == "back") {
      const newCoords = { x: x, y: y };
      setCoordsBack((prev) => [...prev, newCoords]);
    }
  };

  const handleChangeKet = (index, newKet, pic) => {
    if (pic == "front") {
      setCoordsFront((prev) => prev.map((coord, i) => (i === index ? { ...coord, ket: newKet } : coord)));
    } else {
      setCoordsBack((prev) => prev.map((coord, i) => (i === index ? { ...coord, ket: newKet } : coord)));
    }
  };

  console.log("front", coordsFront);

  return (
    <div className='flex justify-center gap-2 border border-bg-prime-color'>
      {/* <img src='/body/front.png' alt='' className='m-2' /> */}
      {/* <img src='/body/back.png' alt='' className='m-2' /> */}
      <div className='flex'>
        <div className='relative transform -translate-x-1/2'>
          {coordsFront.map((coord, index) => (
            <div key={index}>
              <button
                style={{ left: `${coord.x}px`, top: `${coord.y}px` }}
                className={`bg-slate-600 h-3 w-3 border-2 border-red-700 rounded-full absolute `}
                onClick={() =>
                  setFrontModal((prev) => {
                    const updated = [...prev];
                    updated[index] = !updated[index];
                    return updated;
                  })
                }></button>

              {frontModal[index] && (
                <div style={{ left: `${coord.x + 5}px`, top: `${coord.y + 5}px` }} className={`absolute  bg-red-400 px-2 rounded-xl text-xs`}>
                  <div className='flex justify-between items-center'>
                    <p className=''>Note</p>
                    <X
                      className='w-[15px]'
                      onClick={() =>
                        setFrontModal((prev) => {
                          const updated = [...prev];
                          updated[index] = !updated[index];
                          return updated;
                        })
                      }
                    />
                  </div>
                  <input type='text' className='border border-red-500' onChange={(e) => handleChangeKet(index, e.target.value, "front")} value={coordsFront[index].ket || ""} />

                  <div className='flex justify-end'>
                    <Eraser className='w-[15px]' onClick={() => setCoordsFront((prev) => prev.filter((_, i) => i !== index))} />
                    {/* setFrontModal((prev) => prev.map(() => false)); */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <canvas ref={canvasRefFront} width={160} height={360} className='border border-gray-400 w-[160px] h-[360px] border-none' onMouseMove={handleMouseMove} onClick={(e) => handleClick(e, "front")} />
      </div>
      <div className='flex'>
        <div className='relative transform -translate-x-1/2'>
          {coordsBack.map((coord, index) => (
            <div key={index}>
              <button
                style={{ left: `${coord.x}px`, top: `${coord.y}px` }}
                className={`bg-slate-600 h-3 w-3 border-2 border-red-700 rounded-full absolute `}
                onClick={() =>
                  setBackModal((prev) => {
                    const updated = [...prev];
                    updated[index] = !updated[index];
                    return updated;
                  })
                }></button>

              {backModal[index] && (
                <div style={{ left: `${coord.x + 5}px`, top: `${coord.y + 5}px` }} className={`absolute  bg-red-400 px-2 rounded-xl text-xs`}>
                  <div className='flex justify-between items-center'>
                    <p className=''>Note</p>
                    <X
                      className='w-[15px]'
                      onClick={() =>
                        setBackModal((prev) => {
                          const updated = [...prev];
                          updated[index] = !updated[index];
                          return updated;
                        })
                      }
                    />
                  </div>
                  <input type='text' className='border border-red-500' onChange={(e) => handleChangeKet(index, e.target.value, "back")} value={coordsBack[index].ket || ""} />

                  <div className='flex justify-end'>
                    <Eraser className='w-[15px]' onClick={() => setCoordsBack((prev) => prev.filter((_, i) => i !== index))} />
                    {/* setFrontModal((prev) => prev.map(() => false)); */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <canvas ref={canvasRefBack} width={160} height={360} className='border border-gray-400 w-[160px] h-[360px] border-none' onMouseMove={handleMouseMove} onClick={(e) => handleClick(e, "back")} />
      </div>
    </div>
  );
}
