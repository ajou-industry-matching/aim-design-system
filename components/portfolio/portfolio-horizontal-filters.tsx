"use client";

import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const types = ["개인", "기업", "연구실"];

interface PortfolioHorizontalFiltersProps {
  selectedTypes: string[];
  selectedCategories: string[];
  selectedDepartments: string[];
  onTypeChange: (types: string[]) => void;
  onRemoveCategory: (category: string) => void;
  onRemoveDepartment: (department: string) => void;
  onOpenFilterModal: () => void;
  onReset: () => void;
}

/**
 * PortfolioHorizontalFilters 컴포넌트
 * 검색 바 아래 가로로 배치되는 필터 UI
 *
 * 구성:
 * - 유형 토글 버튼 (개인, 기업, 연구실)
 * - 선택된 카테고리/학과 칩 표시
 * - 더보기 필터 버튼
 * - 초기화 버튼
 */
export function PortfolioHorizontalFilters({
  selectedTypes,
  selectedCategories,
  selectedDepartments,
  onTypeChange,
  onRemoveCategory,
  onRemoveDepartment,
  onOpenFilterModal,
  onReset,
}: PortfolioHorizontalFiltersProps) {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const hasFilters =
    selectedTypes.length > 0 ||
    selectedCategories.length > 0 ||
    selectedDepartments.length > 0;

  return (
    <div className="space-y-4">
      {/* 필터 컨트롤 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 유형 토글 버튼 */}
        <div className="flex items-center gap-2">
          <span className="text-[#666] text-[14px] font-medium">유형:</span>
          <div className="flex gap-2">
            {types.map((type) => {
              const isSelected = selectedTypes.includes(type);
              return (
                <Button
                  key={type}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleType(type)}
                  className={`h-8 px-4 text-[14px] ${
                    isSelected
                      ? "bg-[#004a9c] text-white hover:bg-[#003d7a]"
                      : "border-[#e5e5e5] text-[#666] hover:border-[#004a9c] hover:text-[#004a9c]"
                  }`}
                >
                  {type}
                </Button>
              );
            })}
          </div>
        </div>

        {/* 더보기 필터 버튼 */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenFilterModal}
          className="h-8 px-4 border-[#e5e5e5] text-[#666] hover:border-[#004a9c] hover:text-[#004a9c]"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          더보기 필터
          {(selectedCategories.length > 0 || selectedDepartments.length > 0) && (
            <Badge
              variant="default"
              className="ml-2 h-5 min-w-[20px] px-1.5 bg-[#004a9c] text-white text-[12px]"
            >
              {selectedCategories.length + selectedDepartments.length}
            </Badge>
          )}
        </Button>

        {/* 초기화 버튼 */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-4 text-[#808080] hover:text-[#333] text-[14px]"
          >
            초기화
          </Button>
        )}
      </div>

      {/* 선택된 필터 칩 */}
      {(selectedCategories.length > 0 || selectedDepartments.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[#808080] text-[13px]">선택된 필터:</span>

          {/* 카테고리 칩 */}
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="h-7 pl-3 pr-2 bg-[#f5f5f5] text-[#333] text-[13px] hover:bg-[#e5e5e5]"
            >
              {category}
              <button
                onClick={() => onRemoveCategory(category)}
                className="ml-2 hover:text-[#004a9c]"
                aria-label={`${category} 필터 제거`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}

          {/* 학과 칩 */}
          {selectedDepartments.map((dept) => (
            <Badge
              key={dept}
              variant="secondary"
              className="h-7 pl-3 pr-2 bg-[#f5f5f5] text-[#333] text-[13px] hover:bg-[#e5e5e5]"
            >
              {dept}
              <button
                onClick={() => onRemoveDepartment(dept)}
                className="ml-2 hover:text-[#004a9c]"
                aria-label={`${dept} 필터 제거`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
