import { set } from "date-fns";
import { useEffect, useState, useRef } from "react";

export default function BodyPartSelection({ setCoordsBack, setCoordsFront }) {
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
    // Clear Canvas
    await ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgWidth = 150;
    const imgHeight = 350;
    const centerX = (canvas.width - imgWidth) / 2;
    const centerY = (canvas.height - imgHeight) / 2;
    await ctx.drawImage(img, centerX, centerY, imgWidth, imgHeight);

    // Hitung posisi klik relatif terhadap canvas
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    // Draw Red Dot
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI); // radius 4px
    ctx.fillStyle = "red";
    ctx.fill();

    if (position == "front") {
      setCoordsFront({ x, y });
    } else if (position == "back") {
      setCoordsBack({ x, y });
    }
  };

  return (
    <div className='flex justify-center gap-2 border border-bg-prime-color'>
      {/* <img src='/body/front.png' alt='' className='m-2' /> */}
      {/* <img src='/body/back.png' alt='' className='m-2' /> */}
      <canvas ref={canvasRefFront} width={160} height={360} className='border border-gray-400 w-[160px] h-[360px] border-none' onMouseMove={handleMouseMove} onClick={(e) => handleClick(e, "front")} />
      <canvas ref={canvasRefBack} width={160} height={360} className='border border-gray-400 w-[160px] h-[360px] border-none' onMouseMove={handleMouseMove} onClick={(e) => handleClick(e, "back")} />
    </div>
  );
}
