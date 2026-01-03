"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const categories = ["웹 개발", "모바일 앱", "UI/UX 디자인", "데이터 분석", "AI/ML", "게임 개발", "IoT", "블록체인"]

const departments = ["소프트웨어학과", "미디어학과", "산업공학과", "경영학과", "전자공학과", "기계공학과"]

const sortOptions = [
  { label: "최신순", value: "latest" },
  { label: "인기순", value: "popular" },
  { label: "조회순", value: "views" },
]

export function ExploreFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("latest")

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev) => (prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedDepartments([])
    setSortBy("latest")
  }

  const activeFiltersCount = selectedCategories.length + selectedDepartments.length

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Sort Buttons */}
      <div className="flex items-center gap-2">
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={sortBy === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Filter Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <SlidersHorizontal className="h-4 w-4" />
            필터
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>필터</SheetTitle>
            <SheetDescription>원하는 포트폴리오를 찾기 위해 필터를 적용하세요</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">카테고리</Label>
                {selectedCategories.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCategories([])}>
                    초기화
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Departments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">학과</Label>
                {selectedDepartments.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDepartments([])}>
                    초기화
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <Checkbox
                      id={dept}
                      checked={selectedDepartments.includes(dept)}
                      onCheckedChange={() => toggleDepartment(dept)}
                    />
                    <label
                      htmlFor={dept}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {dept}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <>
                <Separator />
                <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  모든 필터 초기화
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Active Filter Badges */}
      {selectedCategories.map((category) => (
        <Badge key={category} variant="secondary" className="gap-1">
          {category}
          <button onClick={() => toggleCategory(category)} className="ml-1 hover:bg-muted rounded-full">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {selectedDepartments.map((dept) => (
        <Badge key={dept} variant="secondary" className="gap-1">
          {dept}
          <button onClick={() => toggleDepartment(dept)} className="ml-1 hover:bg-muted rounded-full">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  )
}
