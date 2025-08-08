// src/components/ui/BackToTop.tsx
"use client";

import { useState, useEffect } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    // แสดงปุ่มเมื่อเลื่อนหน้าจอลงมาเกิน 300px
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // คำนวณ % การเลื่อนหน้าจอ
    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    }
  };

  // ฟังก์ชันสำหรับเลื่อนกลับไปด้านบนสุด
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // คืนค่าฟังก์ชันเพื่อลบ event listener ออกเมื่อคอมโพเนนต์ถูกทำลาย
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // คำนวณค่าสำหรับวงกลม Progress (ปรับขนาดให้เล็กลง)
  const radius = 20; // รัศมีของวงกลม
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white rounded-full text-blue-600 shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
          aria-label="Go to top"
        >
          {/* SVG สำหรับวงกลม Progress */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 48 48"
          >
            {/* วงกลมพื้นหลัง (Track) ทำให้บางและจางลง */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="2" // ทำให้เส้นพื้นหลังบางลง
              className="text-gray-100" // ทำให้สีของเส้นพื้นหลังจางลง
            />
            {/* วงกลมแสดงสถานะ (Progress) */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="transparent"
              stroke="currentColor" // ใช้สีจาก parent (text-blue-600)
              strokeWidth="3" // เส้น progress หนาเท่าเดิมเพื่อความโดดเด่น
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 24 24)" // หมุนให้เริ่มจากด้านบน
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
          </svg>

          {/* ไอคอนลูกศรชี้ขึ้น (ปรับขนาดให้เล็กลง) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 relative" // ใช้ relative เพื่อให้แสดงทับ SVG
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default BackToTop;
