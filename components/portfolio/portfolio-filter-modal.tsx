"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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

interface PortfolioFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  selectedDepartments: string[];
  onApply: (categories: string[], departments: string[]) => void;
}

/**
 * PortfolioFilterModal 컴포넌트
 * 카테고리와 학과를 선택할 수 있는 모달
 *
 * 기능:
 * - 카테고리 다중 선택
 * - 학과 다중 선택
 * - 적용/취소
 * - 스크롤 가능한 내용
 */
export function PortfolioFilterModal({
  open,
  onOpenChange,
  selectedCategories,
  selectedDepartments,
  onApply,
}: PortfolioFilterModalProps) {
  // 로컬 상태 (모달 내에서만 사용)
  const [localCategories, setLocalCategories] = useState<string[]>(selectedCategories);
  const [localDepartments, setLocalDepartments] = useState<string[]>(selectedDepartments);

  // props가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setLocalCategories(selectedCategories);
    setLocalDepartments(selectedDepartments);
  }, [selectedCategories, selectedDepartments, open]);

  const toggleCategory = (category: string) => {
    if (localCategories.includes(category)) {
      setLocalCategories(localCategories.filter((c) => c !== category));
    } else {
      setLocalCategories([...localCategories, category]);
    }
  };

  const toggleDepartment = (dept: string) => {
    if (localDepartments.includes(dept)) {
      setLocalDepartments(localDepartments.filter((d) => d !== dept));
    } else {
      setLocalDepartments([...localDepartments, dept]);
    }
  };

  const handleApply = () => {
    onApply(localCategories, localDepartments);
    onOpenChange(false);
  };

  const handleReset = () => {
    setLocalCategories([]);
    setLocalDepartments([]);
  };

  const isAllCategoriesSelected = localCategories.length === 0;
  const isAllDepartmentsSelected = localDepartments.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-[#333] text-[20px] font-bold">
            필터 선택
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(80vh-200px)] overflow-y-auto pr-4">
          <div className="space-y-6 py-4">
            {/* 카테고리 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[#333] text-[16px] font-semibold">
                  카테고리
                  {localCategories.length > 0 && (
                    <span className="ml-2 text-[#004a9c] text-[14px]">
                      ({localCategories.length})
                    </span>
                  )}
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 전체 옵션 */}
                <div className="flex items-center space-x-2 col-span-2">
                  <Checkbox
                    id="category-all-modal"
                    checked={isAllCategoriesSelected}
                    onCheckedChange={() => setLocalCategories([])}
                  />
                  <label
                    htmlFor="category-all-modal"
                    className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    전체
                  </label>
                </div>

                {/* 개별 카테고리 */}
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`modal-category-${category}`}
                      checked={localCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={`modal-category-${category}`}
                      className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-[#e5e5e5]" />

            {/* 학과 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[#333] text-[16px] font-semibold">
                  학과
                  {localDepartments.length > 0 && (
                    <span className="ml-2 text-[#004a9c] text-[14px]">
                      ({localDepartments.length})
                    </span>
                  )}
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 전체 옵션 */}
                <div className="flex items-center space-x-2 col-span-2">
                  <Checkbox
                    id="dept-all-modal"
                    checked={isAllDepartmentsSelected}
                    onCheckedChange={() => setLocalDepartments([])}
                  />
                  <label
                    htmlFor="dept-all-modal"
                    className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    전체
                  </label>
                </div>

                {/* 개별 학과 */}
                {departments.map((dept) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <Checkbox
                      id={`modal-dept-${dept}`}
                      checked={localDepartments.includes(dept)}
                      onCheckedChange={() => toggleDepartment(dept)}
                    />
                    <label
                      htmlFor={`modal-dept-${dept}`}
                      className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {dept}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-[#e5e5e5] text-[#666] hover:border-[#004a9c] hover:text-[#004a9c]"
          >
            초기화
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#e5e5e5] text-[#666]"
          >
            취소
          </Button>
          <Button
            onClick={handleApply}
            className="bg-[#004a9c] text-white hover:bg-[#003d7a]"
          >
            적용
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
