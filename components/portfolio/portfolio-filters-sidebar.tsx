"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const categories = [
  "웹 개발",
  "모바일 앱",
  "UI/UX 디자인",
  "데이터 분석",
  "AI/ML",
  "게임 개발",
  "IoT",
  "블록체인",
];

const departments = [
  "소프트웨어학과",
  "미디어학과",
  "산업공학과",
  "경영학과",
  "전자공학과",
  "기계공학과",
];

const types = ["개인", "기업", "연구실"];

interface PortfolioFiltersSidebarProps {
  selectedCategories: string[];
  selectedDepartments: string[];
  selectedTypes: string[];
  onCategoryChange: (categories: string[]) => void;
  onDepartmentChange: (departments: string[]) => void;
  onTypeChange: (types: string[]) => void;
  onReset: () => void;
}

/**
 * PortfolioFiltersSidebar 컴포넌트
 * 포트폴리오 필터링을 위한 사이드바
 *
 * 기능:
 * - 유형 다중 선택 (개인, 기업, 연구실)
 * - 카테고리 다중 선택
 * - 학과 다중 선택
 * - 전체 초기화
 *
 * 접근성:
 * - 체크박스에 label 연결
 * - 키보드 네비게이션 지원
 */
export function PortfolioFiltersSidebar({
  selectedCategories,
  selectedDepartments,
  selectedTypes,
  onCategoryChange,
  onDepartmentChange,
  onTypeChange,
  onReset,
}: PortfolioFiltersSidebarProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const toggleDepartment = (dept: string) => {
    if (selectedDepartments.includes(dept)) {
      onDepartmentChange(selectedDepartments.filter((d) => d !== dept));
    } else {
      onDepartmentChange([...selectedDepartments, dept]);
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const isAllCategoriesSelected = selectedCategories.length === 0;
  const isAllDepartmentsSelected = selectedDepartments.length === 0;
  const isAllTypesSelected = selectedTypes.length === 0;

  return (
    <aside
      className="w-[280px] shrink-0"
      role="navigation"
      aria-label="포트폴리오 필터"
    >
      <div className="sticky top-24 bg-white border border-[#e5e5e5] rounded-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[#333] text-[18px] font-semibold leading-[1.44] tracking-[-0.45px]">
            필터
          </h2>
          {(selectedCategories.length > 0 || selectedDepartments.length > 0 || selectedTypes.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-8 px-3 text-[#808080] hover:text-[#333] text-[12px]"
              aria-label="모든 필터 초기화"
            >
              초기화
            </Button>
          )}
        </div>

        <Separator className="bg-[#e5e5e5]" />

        {/* Types */}
        <div className="space-y-4">
          <Label className="text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px]">
            유형
            {selectedTypes.length > 0 && (
              <span className="ml-2 text-[#004a9c] text-[14px]">
                ({selectedTypes.length})
              </span>
            )}
          </Label>

          <div className="space-y-3">
            {/* 전체 옵션 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="type-all"
                checked={isAllTypesSelected}
                onCheckedChange={() => onTypeChange([])}
              />
              <label
                htmlFor="type-all"
                className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                전체
              </label>
            </div>

            {/* 개별 유형 */}
            {types.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                />
                <label
                  htmlFor={`type-${type}`}
                  className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-[#e5e5e5]" />

        {/* Categories */}
        <div className="space-y-4">
          <Label className="text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px]">
            카테고리
            {selectedCategories.length > 0 && (
              <span className="ml-2 text-[#004a9c] text-[14px]">
                ({selectedCategories.length})
              </span>
            )}
          </Label>

          <div className="space-y-3">
            {/* 전체 옵션 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="category-all"
                checked={isAllCategoriesSelected}
                onCheckedChange={() => onCategoryChange([])}
              />
              <label
                htmlFor="category-all"
                className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                전체
              </label>
            </div>

            {/* 개별 카테고리 */}
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-[#e5e5e5]" />

        {/* Departments */}
        <div className="space-y-4">
          <Label className="text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px]">
            학과
            {selectedDepartments.length > 0 && (
              <span className="ml-2 text-[#004a9c] text-[14px]">
                ({selectedDepartments.length})
              </span>
            )}
          </Label>

          <div className="space-y-3">
            {/* 전체 옵션 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dept-all"
                checked={isAllDepartmentsSelected}
                onCheckedChange={() => onDepartmentChange([])}
              />
              <label
                htmlFor="dept-all"
                className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                전체
              </label>
            </div>

            {/* 개별 학과 */}
            {departments.map((dept) => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox
                  id={`dept-${dept}`}
                  checked={selectedDepartments.includes(dept)}
                  onCheckedChange={() => toggleDepartment(dept)}
                />
                <label
                  htmlFor={`dept-${dept}`}
                  className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
