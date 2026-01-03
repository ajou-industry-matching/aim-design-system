"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  Moon,
  Plus,
  Bookmark,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster, toast } from "sonner";

export default function AIMAjouShadcnStyleguide() {
  const [role, setRole] = useState<string>("학생");
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/") {
        const input = document.querySelector<HTMLInputElement>(
          "input[data-global-search]"
        );
        if (input) {
          e.preventDefault();
          input.focus();
        }
      }
      if (e.key === "Escape") {
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function toggleDark() {
    const el = document.documentElement;
    el.classList.toggle("dark");
  }

  function announce(msg: string) {
    if (!liveRegionRef.current) return;
    liveRegionRef.current.textContent = msg;
    toast(msg);
  }

  return (
    <TooltipProvider>
      <style>{`:root{--primary-600:#3E5BFF;--primary-500:#5C73FF;--primary-50:#EEF0FF;--neutral-900:#1A1A1A;--neutral-600:#666666;--neutral-200:#DDDDDD;--neutral-50:#F5F5F7;--success-600:#16A34A;--warning-600:#F59E0B;--error-600:#DC2626}`}</style>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
        <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
          <div className="max-w-7xl mx-auto h-16 px-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl"
                style={{ background: "var(--primary-600)" }}
              />
              <span className="text-xl font-semibold">
                AIM AJOU Design System
              </span>
            </div>

            <div className="flex-1" />

            <div className="hidden md:flex items-center gap-2">
              <div className="w-80">
                <Command className="rounded-xl border">
                  <div className="flex items-center px-3 h-10">
                    <Search className="w-4 h-4 text-neutral-600" />
                    <CommandInput
                      data-global-search
                      placeholder="검색: React, Firebase, 캡스톤..."
                      className="ml-2"
                    />
                    <kbd className="ml-auto text-xs text-neutral-600">/</kbd>
                  </div>
                  <CommandList>
                    <CommandEmpty>최근 검색 없음</CommandEmpty>
                    <CommandGroup heading="추천 태그">
                      <CommandItem>React</CommandItem>
                      <CommandItem>Firebase</CommandItem>
                      <CommandItem>AI·Vision</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>

              <div className="flex items-center gap-2 ml-2">
                <Label className="text-xs text-neutral-600">역할</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-[120px] rounded-xl">
                    <SelectValue placeholder="역할" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="학생">학생</SelectItem>
                    <SelectItem value="교수">교수</SelectItem>
                    <SelectItem value="기업">기업</SelectItem>
                    <SelectItem value="관리자">관리자</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="rounded-xl">
                    <Bell className="w-4 h-4 mr-1" /> 알림
                  </Button>
                </TooltipTrigger>
                <TooltipContent>알림 열기</TooltipContent>
              </Tooltip>

              <Button
                variant="secondary"
                className="rounded-xl"
                onClick={toggleDark}
              >
                <Moon className="w-4 h-4 mr-2" /> 테마
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
          <aside className="hidden lg:block col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>섹션</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2 text-sm text-neutral-600">
                  {[
                    ["tokens", "1. 토큰"],
                    ["type", "2. 타이포"],
                    ["spacing", "3. 간격·그리드"],
                    ["buttons", "4. 버튼"],
                    ["chips", "5. 칩/배지"],
                    ["inputs", "6. 입력"],
                    ["cards", "7. 카드"],
                    ["nav", "8. 내비게이션"],
                    ["feedback", "9. 피드백"],
                    ["data", "10. 데이터"],
                    ["overlays", "11. 오버레이"],
                    ["states", "12. 상태"],
                    ["a11y", "13. 접근성"],
                  ].map(([id, label]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="block hover:text-neutral-900"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          <section className="col-span-12 lg:col-span-9 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  AIM AJOU UI·UX 공통 컴포넌트 스타일가이드
                </CardTitle>
                <CardDescription>
                  shadcn/ui · Tailwind · 설계 원칙: Signal first, Progressive
                  creation, Decision-time UX, Consistency, Privacy by default
                </CardDescription>
              </CardHeader>
            </Card>

            <section id="tokens" className="space-y-4">
              <h2 className="text-xl font-semibold">1. 디자인 토큰</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Primary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--primary-600)" }}
                      />
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--primary-500)" }}
                      />
                      <div
                        className="h-16 rounded-lg border"
                        style={{ background: "var(--primary-50)" }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-2">
                      600 #3E5BFF · 500 #5C73FF · 50 #EEF0FF
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Neutral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--neutral-900)" }}
                      />
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--neutral-600)" }}
                      />
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--neutral-200)" }}
                      />
                      <div
                        className="h-16 rounded-lg border"
                        style={{ background: "var(--neutral-50)" }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-2">
                      900 #1A1A1A · 600 #666666 · 200 #DDDDDD · 50 #F5F5F7
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--success-600)" }}
                      />
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--warning-600)" }}
                      />
                      <div
                        className="h-16 rounded-lg"
                        style={{ background: "var(--error-600)" }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-2">
                      성공 #16A34A · 경고 #F59E0B · 오류 #DC2626
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="type" className="space-y-4">
              <h2 className="text-xl font-semibold">2. 타이포그래피</h2>
              <Card>
                <CardContent className="space-y-2 pt-6">
                  <div className="text-[28px] leading-9 tracking-tight font-extrabold">
                    Display 28/36 굵게
                  </div>
                  <div className="text-2xl leading-8 font-bold">H1 24/32</div>
                  <div className="text-xl leading-7 font-semibold">
                    H2 20/28
                  </div>
                  <div className="text-lg leading-[26px] font-semibold">
                    H3 18/26
                  </div>
                  <p className="text-base leading-6">
                    Body 16/24 본문. 링크는{" "}
                    <a
                      href="#"
                      className="underline"
                      style={{ color: "var(--primary-600)" }}
                    >
                      이렇게
                    </a>
                    .
                  </p>
                  <p className="text-[13px] leading-[18px] text-neutral-600">
                    Caption 13/18. 코드{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5">
                      const x = 1;
                    </code>
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="spacing" className="space-y-4">
              <h2 className="text-xl font-semibold">3. 간격 · 그리드</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-neutral-600 mb-2">8pt 스케일</p>
                  <div className="flex items-end gap-3">
                    {[8, 16, 24, 32, 40, 48].map((h) => (
                      <div
                        key={h}
                        className="w-6 rounded"
                        style={{ height: h, background: "var(--primary-600)" }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 mt-2">
                    8, 16, 24, 32, 40, 48…
                  </p>
                  <Separator className="my-4" />
                  <p className="text-sm text-neutral-600 mb-2">
                    12 컬럼 그리드
                  </p>
                  <div className="grid grid-cols-12 gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 rounded border"
                        style={{
                          background: "var(--primary-50)",
                          borderColor: "#cfd6ff",
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="buttons" className="space-y-4">
              <h2 className="text-xl font-semibold">4. 버튼</h2>
              <Card>
                <CardContent className="pt-6 flex flex-wrap gap-3 items-center">
                  <Button className="rounded-xl">Primary</Button>
                  <Button variant="secondary" className="rounded-xl">
                    Secondary
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Tertiary
                  </Button>
                  <Button variant="destructive" className="rounded-xl">
                    위험 액션
                  </Button>
                  <Button disabled className="rounded-xl">
                    Disabled
                  </Button>
                  <Button className="rounded-xl">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    저장 중...
                  </Button>
                </CardContent>
              </Card>
            </section>

            <section id="chips" className="space-y-4">
              <h2 className="text-xl font-semibold">5. 칩 · 배지</h2>
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Firebase",
                      "AI·Vision",
                      "ENGR101",
                      "AJOU-VisLab",
                    ].map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full px-3 py-1 text-[13px]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="outline" className="rounded-full">
                      비공개
                    </Badge>
                    <Badge
                      className="rounded-full"
                      style={{
                        background: "var(--primary-50)",
                        color: "var(--primary-600)",
                      }}
                    >
                      링크공유
                    </Badge>
                    <Badge className="rounded-full">공개</Badge>
                    <Badge
                      className="rounded-full"
                      style={{
                        background: "#FFF7ED",
                        color: "var(--warning-600)",
                      }}
                    >
                      승인 필요
                    </Badge>
                    <Badge variant="outline" className="rounded-full">
                      3일 전 업데이트
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="inputs" className="space-y-4">
              <h2 className="text-xl font-semibold">6. 입력</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">제목</Label>
                      <Input
                        id="title"
                        placeholder="예) 캡스톤: 실시간 객체인식"
                        className="rounded-xl"
                      />
                      <p className="text-xs text-neutral-600">
                        Validation hint
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>기간</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="date" className="rounded-xl" />
                        <Input type="date" className="rounded-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>태그/스택</Label>
                    <div className="flex flex-wrap gap-2 border rounded-xl p-2">
                      <Badge variant="secondary" className="rounded-full">
                        React
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        Node.js
                      </Badge>
                      <Input
                        placeholder="추가..."
                        className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        aria-label="태그 추가"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Markdown 본문</Label>
                    <div className="rounded-xl border overflow-hidden">
                      <div className="flex items-center gap-2 px-2 h-10 bg-neutral-50">
                        <Button size="sm" variant="outline">
                          B
                        </Button>
                        <Button size="sm" variant="outline">
                          I
                        </Button>
                        <Button size="sm" variant="outline">
                          링크
                        </Button>
                        <Button size="sm" variant="outline">
                          코드
                        </Button>
                        <div className="ml-auto text-xs text-neutral-600">
                          자동 저장
                        </div>
                      </div>
                      <Textarea
                        rows={6}
                        placeholder="# 문제 정의 → 접근 방법 → 성과/지표 → 회고"
                        className="resize-y min-h-[140px]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" className="rounded-xl">
                      임시저장
                    </Button>
                    <Button className="rounded-xl">미리보기</Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="cards" className="space-y-4">
              <h2 className="text-xl font-semibold">7. 카드</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="h-36 bg-neutral-200" />
                  <CardContent className="space-y-2 pt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        YOLOv8로 제조 결함 탐지
                      </h3>
                      <Badge variant="outline">3일 전 업데이트</Badge>
                    </div>
                    <p className="text-sm text-neutral-600">
                      역할: 모델링 · 기여도 60% · 팀 4
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        Python
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        YOLOv8
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        FastAPI
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        +2
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" className="rounded-xl">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Repo
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        Demo
                      </Button>
                      <div className="ml-auto" />
                      <Button variant="secondary" className="rounded-xl">
                        <Bookmark className="w-4 h-4 mr-2" />
                        북마크
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="h-36 bg-neutral-200" />
                  <CardContent className="space-y-2 pt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        AJOU-VisLab 홍보 페이지
                      </h3>
                      <Badge
                        style={{
                          background: "var(--primary-50)",
                          color: "var(--primary-600)",
                        }}
                      >
                        링크공유
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-600">
                      연구실 소개 · 대표 프로젝트 · 구성원 · 연락
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        Next.js
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        MUI
                      </Badge>
                      <Badge variant="secondary" className="rounded-full">
                        Firebase
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs text-neutral-600">
                        조회 1,204 · 좋아요 56
                      </span>
                      <div className="ml-auto" />
                      <Button className="rounded-xl">자세히</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="nav" className="space-y-4">
              <h2 className="text-xl font-semibold">8. 내비게이션</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Orgs</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">ENGR101</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>AI·Vision</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>

                  <div className="grid grid-cols-4 gap-4">
                    <aside className="col-span-1">
                      <p className="text-xs text-neutral-600 mb-2">필터</p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox defaultChecked /> React
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox /> Firebase
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox /> Computer Vision
                        </label>
                      </div>
                    </aside>
                    <div className="col-span-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Button variant="outline" className="rounded-xl">
                          추천
                        </Button>
                        <Button variant="outline" className="rounded-xl">
                          최신
                        </Button>
                        <Button variant="outline" className="rounded-xl">
                          인기
                        </Button>
                        <div className="ml-auto" />
                        <Button variant="secondary" className="rounded-xl">
                          검색 저장
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Card className="h-28" />
                        <Card className="h-28" />
                        <Card className="h-28" />
                        <Card className="h-28" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="feedback" className="space-y-4">
              <h2 className="text-xl font-semibold">9. 피드백</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Toast</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      className="rounded-xl"
                      onClick={() =>
                        toast("저장 완료", {
                          description: "변경 사항이 저장되었습니다.",
                        })
                      }
                    >
                      토스트 보여주기
                    </Button>
                    <Alert>
                      <AlertTitle>Inline Error</AlertTitle>
                      <AlertDescription>제목은 필수입니다.</AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">경고 배너</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert className="border-orange-300/50">
                      <AlertTitle>팀 동의 확인 필요</AlertTitle>
                      <AlertDescription>
                        공개 전 팀 동의를 확인하세요.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="data" className="space-y-4">
              <h2 className="text-xl font-semibold">10. 데이터 (관리자)</h2>
              <Card>
                <CardContent className="pt-6 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>제목</TableHead>
                        <TableHead>작성자</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>#1092</TableCell>
                        <TableCell>AI 캡스톤 결과물</TableCell>
                        <TableCell>김재준</TableCell>
                        <TableCell>
                          <Badge
                            className="rounded-full"
                            style={{
                              background: "#FFF7ED",
                              color: "var(--warning-600)",
                            }}
                          >
                            승인 대기
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-lg"
                          >
                            미리보기
                          </Button>
                          <Button size="sm" className="rounded-lg">
                            승인
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-lg"
                          >
                            신고
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>#1093</TableCell>
                        <TableCell>AJOU-VisLab 소개</TableCell>
                        <TableCell>이수연</TableCell>
                        <TableCell>
                          <Badge
                            className="rounded-full"
                            style={{
                              background: "#ECFDF5",
                              color: "var(--success-600)",
                            }}
                          >
                            공개
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-lg"
                          >
                            미리보기
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-lg"
                          >
                            숨김
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>

            <section id="overlays" className="space-y-4">
              <h2 className="text-xl font-semibold">11. 오버레이</h2>
              <Card>
                <CardContent className="pt-6 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="rounded-xl">모달 열기</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>공개 설정</DialogTitle>
                        <DialogDescription>
                          기본 비공개. 공유 범위를 전환하세요.
                        </DialogDescription>
                      </DialogHeader>
                      <RadioGroup
                        defaultValue="private"
                        className="space-y-2 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="v1" value="private" />
                          <Label htmlFor="v1">비공개</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="v2" value="link" />
                          <Label htmlFor="v2">링크공유</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="v3" value="public" />
                          <Label htmlFor="v3">공개</Label>
                        </div>
                      </RadioGroup>
                      <DialogFooter>
                        <Button variant="outline">취소</Button>
                        <Button
                          onClick={() =>
                            announce("공개 설정이 저장되었습니다.")
                          }
                        >
                          저장
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" className="rounded-xl">
                        드로어 열기
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>검수 체크리스트</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox defaultChecked /> 저작권 확인
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox /> 개인정보 마스킹
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox /> 팀 동의
                        </label>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="rounded-xl">
                        삭제
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          정말 삭제하시겠습니까?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          되돌릴 수 없습니다.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => announce("삭제되었습니다.")}
                        >
                          삭제
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </section>

            <section id="states" className="space-y-4">
              <h2 className="text-xl font-semibold">12. 상태 설계</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="text-center p-6">
                  <CardTitle className="text-base">Empty</CardTitle>
                  <CardDescription>
                    첫 포트폴리오를 시작해보세요.
                  </CardDescription>
                  <Button className="mt-3 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    템플릿 사용
                  </Button>
                </Card>

                <Card className="p-6">
                  <CardTitle className="text-base mb-2">Loading</CardTitle>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                </Card>

                <Card className="p-6">
                  <CardTitle className="text-base mb-2">Error</CardTitle>
                  <Alert variant="destructive">
                    <AlertTitle>저장 실패</AlertTitle>
                    <AlertDescription>
                      저장에 문제가 발생했습니다.{" "}
                      <Button
                        variant="link"
                        className="px-1"
                        onClick={() => announce("지금 저장을 시도합니다")}
                      >
                        지금 저장
                      </Button>
                    </AlertDescription>
                  </Alert>
                </Card>
              </div>
              <Card className="p-6">
                <CardTitle className="text-base mb-2">
                  Permission & Offline
                </CardTitle>
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  <Alert>
                    <AlertTitle>권한 부족</AlertTitle>
                    <AlertDescription>
                      이 콘텐츠는 팀 공개입니다.{" "}
                      <Button variant="link" className="px-1">
                        접근 요청
                      </Button>
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-orange-300/50">
                    <AlertTitle>오프라인</AlertTitle>
                    <AlertDescription>
                      변경 사항은 로컬 큐에 저장됩니다.
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>
            </section>

            <section id="a11y" className="space-y-4 mb-10">
              <h2 className="text-xl font-semibold">13. 접근성 가드레일</h2>
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <ul className="list-disc pl-6 text-sm text-neutral-700 dark:text-neutral-300">
                    <li>텍스트 대비 4.5:1, 대형 3:1 이상</li>
                    <li>
                      포커스 이동 가능, 키보드 트랩 금지, ESC/외부 클릭으로 모달
                      닫기
                    </li>
                    <li>이미지 대체텍스트, 표 캡션 및 헤더 스코프</li>
                    <li>라이브 리전으로 알림 읽기</li>
                  </ul>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="rounded-xl"
                      onClick={toggleDark}
                    >
                      다크모드 토글
                    </Button>
                    <Button
                      className="rounded-xl"
                      onClick={() => announce("라이브 리전: 저장 완료")}
                    >
                      라이브 리전 테스트
                    </Button>
                  </div>
                  <div
                    ref={liveRegionRef}
                    aria-live="polite"
                    className="sr-only"
                  />
                </CardContent>
              </Card>
            </section>
          </section>
        </main>

        <div className="md:hidden sticky bottom-0 border-t bg-white/90 dark:bg-neutral-900/90 backdrop-blur">
          <Tabs defaultValue="explore" className="max-w-7xl mx-auto">
            <TabsList className="grid grid-cols-4 rounded-none w-full">
              <TabsTrigger value="explore">탐색</TabsTrigger>
              <TabsTrigger value="create">작성</TabsTrigger>
              <TabsTrigger value="my">내 작업</TabsTrigger>
              <TabsTrigger value="notif">알림</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Toaster />
      </div>
    </TooltipProvider>
  );
}
