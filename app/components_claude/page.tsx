"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Search,
  Bell,
  User,
  Heart,
  Eye,
  Filter,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lock,
  FileText,
  Link2,
  X,
} from "lucide-react";

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 로고 & 메뉴 */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="font-bold text-gray-900 text-lg hidden sm:inline">
                  AIM AJOU
                </span>
              </a>

              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 bg-blue-50"
                >
                  탐색
                </Button>
                <Button variant="ghost" size="sm">
                  작성
                </Button>
                <Button variant="ghost" size="sm">
                  내 작업
                </Button>
                <Button variant="ghost" size="sm">
                  조직
                </Button>
              </div>
            </div>

            {/* 검색 */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="프로젝트, 스택, 사람 검색..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* 우측 액션 */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://ui-avatars.com/api/?name=Kim+Ajou&background=3b82f6&color=fff" />
                  <AvatarFallback>KA</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">
                  김아주
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Design System Style Guide
          </h1>
          <p className="text-lg text-gray-600">
            AIM AJOU 프로젝트를 위한 shadcn/ui 기반 컴포넌트 라이브러리
          </p>
        </div>

        {/* 1. Buttons */}
        <section id="buttons" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">1. Buttons</h2>

          <Card>
            <CardContent className="p-8 space-y-10">
              {/* Default */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Default
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button>저장하기</Button>
                  <Button>
                    <Plus className="h-5 w-5" />새 포트폴리오
                  </Button>
                  <Button disabled>저장 중...</Button>
                </div>
              </div>

              {/* Outline */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Outline
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">취소</Button>
                  <Button variant="outline">
                    <Filter className="h-5 w-5" />
                    필터 적용
                  </Button>
                </div>
              </div>

              {/* Ghost */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Ghost
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost">더보기</Button>
                  <Button variant="ghost">건너뛰기</Button>
                </div>
              </div>

              {/* Destructive */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Destructive
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    삭제
                  </Button>
                  <Button variant="destructive">영구 삭제</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Badges */}
        <section id="badges" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            2. Badges & Chips
          </h2>

          <Card>
            <CardContent className="p-8 space-y-10">
              {/* 상태 배지 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Status Badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    공개
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-yellow-200 bg-yellow-50 text-yellow-700"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full" />
                    승인 대기
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-gray-300 bg-gray-100 text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    비공개
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700"
                  >
                    <Link2 className="h-3 w-3" />
                    링크 공유
                  </Badge>
                </div>
              </div>

              {/* 기술 스택 칩 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Tech Stack Chips
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:shadow-sm cursor-pointer"
                  >
                    React
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-orange-200 bg-orange-50 text-orange-700 hover:border-orange-300 hover:shadow-sm cursor-pointer"
                  >
                    Firebase
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700 hover:border-green-300 hover:shadow-sm cursor-pointer"
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-purple-200 bg-purple-50 text-purple-700 hover:border-purple-300 hover:shadow-sm cursor-pointer"
                  >
                    Python
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-pink-200 bg-pink-50 text-pink-700 hover:border-pink-300 hover:shadow-sm cursor-pointer"
                  >
                    TensorFlow
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-600"
                  >
                    +3
                  </Badge>
                </div>
              </div>

              {/* 최신성 배지 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Recency Badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-red-100 text-red-700 border-0">
                    🔥 방금
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700 border-0">
                    ⚡ 3일 전 업데이트
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-0">
                    ✨ 이번 주 인기
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Portfolio Cards */}
        <section id="cards" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            3. Portfolio Cards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
              {/* 이미지 */}
              <div className="relative aspect-video bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-0">
                    ⚡ 2일 전
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-500 text-white border-0">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    공개
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition">
                    실시간 객체 인식 및 추적 시스템
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">
                  YOLOv8 기반 실시간 객체 탐지와 DeepSORT 알고리즘을 활용한 다중
                  객체 추적 시스템
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* 메타 정보 */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3 w-3" />
                    개발자
                  </span>
                  <span>•</span>
                  <span>4명 팀</span>
                  <span>•</span>
                  <span>6개월</span>
                </div>

                {/* 스택 */}
                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    className="border-purple-200 bg-purple-50 text-purple-700 text-xs"
                  >
                    Python
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-pink-200 bg-pink-50 text-pink-700 text-xs"
                  >
                    TensorFlow
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700 text-xs"
                  >
                    OpenCV
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-600 text-xs"
                  >
                    +2
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Kim+Ajou&background=3b82f6&color=fff" />
                      <AvatarFallback>KA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        김아주
                      </p>
                      <p className="text-xs text-gray-500">AJOU-VisLab</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      342
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-4 w-4 fill-current" />
                      28
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
              <div className="relative aspect-video bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500">
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-0">
                    🔥 방금
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-yellow-500 text-white border-0">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    승인대기
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition">
                    E-커머스 플랫폼 구축
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">
                  React와 Node.js를 활용한 풀스택 쇼핑몰 플랫폼. 결제 시스템,
                  재고 관리 포함
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>풀스택 개발</span>
                  <span>•</span>
                  <span>3명 팀</span>
                  <span>•</span>
                  <span>4개월</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700 text-xs"
                  >
                    React
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700 text-xs"
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-indigo-200 bg-indigo-50 text-indigo-700 text-xs"
                  >
                    PostgreSQL
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Park+Dev&background=10b981&color=fff" />
                      <AvatarFallback>PD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        박개발
                      </p>
                      <p className="text-xs text-gray-500">웹개발팀</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      128
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-4 w-4 fill-current" />
                      15
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
              <div className="relative aspect-video bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500">
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-0">
                    ✨ 인기
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-500 text-white border-0">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    공개
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition">
                    모바일 헬스케어 앱
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">
                  운동 기록 및 식단 관리 통합 솔루션. AI 기반 건강 조언 기능
                  포함
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>모바일 개발</span>
                  <span>•</span>
                  <span>개인</span>
                  <span>•</span>
                  <span>3개월</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    className="border-sky-200 bg-sky-50 text-sky-700 text-xs"
                  >
                    React Native
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-orange-200 bg-orange-50 text-orange-700 text-xs"
                  >
                    Firebase
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Lee+Mobile&background=f59e0b&color=fff" />
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        이모바일
                      </p>
                      <p className="text-xs text-gray-500">독립개발자</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      567
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-4 w-4 fill-current" />
                      42
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* 4. Form Inputs */}
        <section id="inputs" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            4. Form Inputs
          </h2>

          <Card>
            <CardContent className="p-8">
              <div className="max-w-2xl space-y-6">
                {/* 기본 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    프로젝트 제목 <span className="text-red-500">*</span>
                  </Label>
                  <Input id="title" placeholder="프로젝트 이름을 입력하세요" />
                </div>

                {/* 성공 상태 */}
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub 저장소 URL</Label>
                  <div className="relative">
                    <Input
                      id="github"
                      type="url"
                      value="https://github.com/ajou/aim-project"
                      className="pr-11 border-green-500 bg-green-50/50"
                    />
                    <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    저장소 연결 확인됨
                  </p>
                </div>

                {/* 에러 상태 */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value="invalid-email"
                      className="pr-11 border-red-500 bg-red-50/50"
                      aria-invalid="true"
                    />
                    <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-600" />
                  </div>
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    올바른 이메일 형식이 아닙니다
                  </p>
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="description">프로젝트 설명</Label>
                  <Textarea
                    id="description"
                    placeholder="프로젝트의 목표, 해결하고자 하는 문제, 주요 기능을 설명해주세요..."
                    rows={4}
                  />
                  <p className="text-sm text-gray-500">
                    최소 100자 이상 작성해주세요 (0/100)
                  </p>
                </div>

                {/* Select */}
                <div className="space-y-2">
                  <Label>역할</Label>
                  <Select defaultValue="developer">
                    <SelectTrigger>
                      <SelectValue placeholder="역할을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">개발자</SelectItem>
                      <SelectItem value="designer">디자이너</SelectItem>
                      <SelectItem value="pm">PM</SelectItem>
                      <SelectItem value="planner">기획자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Checkbox */}
                <div className="space-y-3">
                  <Label>공개 범위</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="public" defaultChecked />
                      <Label
                        htmlFor="public"
                        className="text-sm font-normal cursor-pointer"
                      >
                        전체 공개
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="org" />
                      <Label
                        htmlFor="org"
                        className="text-sm font-normal cursor-pointer"
                      >
                        조직 내부만
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="link" />
                      <Label
                        htmlFor="link"
                        className="text-sm font-normal cursor-pointer"
                      >
                        링크 공유만
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Radio */}
                <div className="space-y-3">
                  <Label>참여 형태</Label>
                  <RadioGroup defaultValue="team">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="team" id="team" />
                      <Label
                        htmlFor="team"
                        className="text-sm font-normal cursor-pointer"
                      >
                        팀 프로젝트
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personal" id="personal" />
                      <Label
                        htmlFor="personal"
                        className="text-sm font-normal cursor-pointer"
                      >
                        개인 프로젝트
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. State Design */}
        <section id="states" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            5. State Design
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Empty State */}
            <Card className="p-12 text-center">
              <CardContent className="space-y-4 p-0">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    아직 포트폴리오가 없습니다
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    첫 번째 포트폴리오를 만들어
                    <br />
                    여러분의 프로젝트를 소개해보세요
                  </p>
                </div>
                <Button>새 포트폴리오 만들기</Button>
              </CardContent>
            </Card>

            {/* Loading State */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle>Loading (Skeleton)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-0">
                <div className="flex gap-4">
                  <Skeleton className="w-32 h-20 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-14 rounded-full" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error State */}
            <Card className="p-12 text-center">
              <CardContent className="space-y-4 p-0">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    페이지를 불러올 수 없습니다
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    일시적인 오류가 발생했습니다
                    <br />
                    잠시 후 다시 시도해주세요
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button>새로고침</Button>
                  <Button variant="outline">홈으로</Button>
                </div>
              </CardContent>
            </Card>

            {/* Permission State */}
            <Card className="p-12 text-center">
              <CardContent className="space-y-4 p-0">
                <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    접근 권한이 필요합니다
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    이 콘텐츠는 팀 공개입니다
                    <br />
                    소유자에게 접근 권한을 요청할 수 있습니다
                  </p>
                </div>
                <Button>접근 권한 요청</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. Alerts & Toasts */}
        <section id="alerts" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            6. Alerts & Notifications
          </h2>

          <Card>
            <CardContent className="p-8">
              <div className="max-w-md space-y-4">
                {/* Success Alert */}
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">
                    포트폴리오가 저장되었습니다
                  </AlertTitle>
                </Alert>

                {/* Info Alert */}
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-900">
                    새로운 댓글이 달렸습니다
                  </AlertTitle>
                  <AlertDescription className="text-blue-700">
                    김교수님이 회고 섹션에 피드백을 남겼습니다
                  </AlertDescription>
                </Alert>

                {/* Warning Alert */}
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-900">
                    승인 대기 중입니다
                  </AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    관리자 검토 후 공개됩니다 (평균 1-2일 소요)
                  </AlertDescription>
                </Alert>

                {/* Error Alert */}
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>저장에 실패했습니다</AlertTitle>
                  <AlertDescription>
                    네트워크 연결을 확인하고 다시 시도해주세요
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7. Progress */}
        <section id="progress" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            7. Progress & Steppers
          </h2>

          <Card>
            <CardContent className="p-8 space-y-10">
              {/* Progress Bars */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Progress Bars
                </h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        프로필 완성도
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        75%
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        파일 업로드 중...
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        45%
                      </span>
                    </div>
                    <Progress value={45} className="h-2 [&>div]:bg-green-600" />
                  </div>
                </div>
              </div>

              {/* Stepper */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Stepper (온보딩)
                </h3>
                <div className="flex items-center max-w-2xl">
                  {/* Step 1 완료 */}
                  <div className="flex-1">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold mb-2 shadow-sm">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        기본 정보
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-green-600 -mt-8"></div>

                  {/* Step 2 현재 */}
                  <div className="flex-1">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold mb-2 ring-4 ring-blue-100 shadow-sm">
                        2
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        스택 선택
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 -mt-8"></div>

                  {/* Step 3 대기 */}
                  <div className="flex-1">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold mb-2">
                        3
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        첫 포트폴리오
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 8. Avatars */}
        <section id="avatars" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            8. Avatars & User Chips
          </h2>

          <Card>
            <CardContent className="p-8 space-y-8">
              {/* 아바타 사이즈 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Avatar Sizes
                </h3>
                <div className="flex items-end gap-4">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://ui-avatars.com/api/?name=XS&size=24&background=3b82f6&color=fff" />
                    <AvatarFallback>XS</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://ui-avatars.com/api/?name=SM&size=32&background=10b981&color=fff" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://ui-avatars.com/api/?name=MD&size=40&background=f59e0b&color=fff" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://ui-avatars.com/api/?name=LG&size=48&background=ef4444&color=fff" />
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://ui-avatars.com/api/?name=XL&size=64&background=8b5cf6&color=fff" />
                    <AvatarFallback>XL</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* 사용자 칩 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  User Chips
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer transition">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Kim+Ajou&size=24&background=3b82f6&color=fff" />
                      <AvatarFallback>KA</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">
                      김아주
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://ui-avatars.com/api/?name=Park+Dev&size=24&background=10b981&color=fff" />
                      <AvatarFallback>PD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">
                      박개발
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* 아바타 그룹 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Avatar Group (팀 멤버)
                </h3>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <Avatar className="h-10 w-10 ring-2 ring-white">
                      <AvatarImage src="https://ui-avatars.com/api/?name=A&size=40&background=3b82f6&color=fff" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10 ring-2 ring-white">
                      <AvatarImage src="https://ui-avatars.com/api/?name=B&size=40&background=10b981&color=fff" />
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10 ring-2 ring-white">
                      <AvatarImage src="https://ui-avatars.com/api/?name=C&size=40&background=f59e0b&color=fff" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10 ring-2 ring-white">
                      <AvatarImage src="https://ui-avatars.com/api/?name=D&size=40&background=ef4444&color=fff" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10 ring-2 ring-white bg-gray-200">
                      <AvatarFallback className="text-xs font-semibold text-gray-600">
                        +3
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">7명의 팀원</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* 모바일 하단 네비게이션 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          <Button
            variant="ghost"
            className="flex-col h-auto py-2 text-blue-600"
          >
            <Search className="h-6 w-6 mb-1" />
            <span className="text-xs">탐색</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2">
            <Plus className="h-6 w-6 mb-1" />
            <span className="text-xs">작성</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2">
            <FileText className="h-6 w-6 mb-1" />
            <span className="text-xs">내 작업</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2 relative">
            <Bell className="h-6 w-6 mb-1" />
            <span className="absolute top-2 right-1/4 w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-xs">알림</span>
          </Button>
        </div>
      </nav>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-20 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              AIM AJOU Design System v1.0
            </p>
            <p className="text-sm text-gray-400">
              © 2025 Ajou University. Built with shadcn/ui.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
