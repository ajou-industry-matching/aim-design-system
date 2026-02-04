"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading for 3 seconds, then redirect to home
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Loading Spinner */}
        <div className="w-16 h-16 border-4 border-[#E0EDFB] border-t-[#004A9C] rounded-full animate-spin"></div>
        
        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[24px] font-bold text-[#1A1A1A] leading-[1.33]">
            Google 로그인 중...
          </h1>
          <p className="text-[16px] text-[#666666] leading-[1.5]">
            잠시만 기다려주세요. 자동으로 이동합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
