"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/portfolio?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-[#0056b3] flex items-center gap-2 px-4 py-[10px] rounded-full h-[50px] cursor-text">
        <Search className="w-5 h-5 text-[#f9f9f9] shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="포트폴리오를 검색해보세요"
          className="flex-1 bg-transparent text-[#f9f9f9] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] outline-none placeholder:text-[#f9f9f9]"
        />
      </div>
    </form>
  );
}
