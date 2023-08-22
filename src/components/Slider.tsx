import React, { useState } from 'react';

export default function Slider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    //? getBoundingClientRect(): Element의 크기와 뷰포트에 대한 상대적인 위치를 반환
    const rect = e.currentTarget.getBoundingClientRect();

    // 0 ~ rect.width 사이의 값으로 x를 제한
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

    // 0 ~ 100 사이의 값으로 percent를 제한
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  return (
    <div onMouseUp={handleMouseUp} className="w-full relative">
      <div
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
        className="relative w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
      >
        <img
          src="https://images.unsplash.com/photo-1523435324848-a7a613898152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
          className="w-full h-full"
          alt=""
        />
        <div
          className="absolute top-0 left-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1598875791852-8bb153e713f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2010&q=80"
            className="w-full h-full"
            alt=""
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-violet-500/50 absolute rounded-full h-6 w-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " />
        </div>
      </div>
    </div>
  );
}
