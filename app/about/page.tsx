"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap,
  Building2,
  FileText,
  Share2,
  Award,
  TrendingUp,
  CheckCircle2,
  Target,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AboutPage() {
  const stats = [
    {
      label: "등록된 포트폴리오",
      value: "1,200",
      unit: "개",
      icon: <FileText className="w-8 h-8" />,
    },
    {
      label: "활동 중인 사용자",
      value: "800",
      unit: "명",
      icon: <Users className="w-8 h-8" />,
    },
    {
      label: "참여 조직",
      value: "50",
      unit: "개",
      icon: <Building2 className="w-8 h-8" />,
    },
    {
      label: "성사된 매칭",
      value: "150",
      unit: "건",
      icon: <Award className="w-8 h-8" />,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "계정 생성",
      description: "아주대학교 이메일로 간편하게 가입하고 프로필을 설정하세요.",
      icon: <Users className="w-10 h-10" />,
    },
    {
      number: "02",
      title: "포트폴리오 작성",
      description: "프로젝트, 수상 경력, 자격증을 체계적으로 정리하세요.",
      icon: <FileText className="w-10 h-10" />,
    },
    {
      number: "03",
      title: "조직 참여",
      description: "동아리, 학과, 연구실에서 팀원들과 협업하세요.",
      icon: <Building2 className="w-10 h-10" />,
    },
    {
      number: "04",
      title: "커리어 개발",
      description: "포트폴리오를 공유하여 새로운 기회를 만나세요.",
      icon: <Share2 className="w-10 h-10" />,
    },
  ];

  const features = [
    {
      title: "통합 포트폴리오 관리",
      description: "프로젝트, 수상, 자격증, 논문 등 모든 성과를 한 곳에서 관리할 수 있습니다.",
      details: [
        "다양한 형식의 파일 업로드",
        "태그 및 카테고리 분류",
        "버전 관리 및 수정 이력",
        "공개 범위 설정",
      ],
      icon: <GraduationCap className="w-12 h-12" />,
    },
    {
      title: "조직 및 팀 협업",
      description: "동아리, 학과, 연구실을 만들고 구성원들과 효율적으로 협업할 수 있습니다.",
      details: [
        "조직별 공지사항 관리",
        "팀 프로젝트 공동 작업",
        "구성원 역할 관리",
        "조직 포트폴리오 통합",
      ],
      icon: <Users className="w-12 h-12" />,
    },
    {
      title: "커리어 지원 시스템",
      description: "포트폴리오를 기반으로 취업 및 진로 개발을 지원합니다.",
      details: [
        "이력서 자동 생성",
        "기업 채용 연결",
        "멘토링 매칭",
        "채용 공고 제공",
      ],
      icon: <Briefcase className="w-12 h-12" />,
    },
  ];

  const advantages = [
    {
      icon: <Target className="w-10 h-10" />,
      title: "체계적인 성과 관리",
      description: "흩어진 파일과 정보를 한 곳에 모아 언제 어디서나 접근할 수 있습니다.",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: "전문적인 포트폴리오",
      description: "템플릿과 가이드로 누구나 전문적인 포트폴리오를 만들 수 있습니다.",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "맞춤형 기회 발견",
      description: "관심사와 역량에 맞는 프로젝트, 채용 기회를 추천받을 수 있습니다.",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "효율적인 협업",
      description: "팀 프로젝트와 조직 활동을 효율적으로 관리할 수 있습니다.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Simple & Clean */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center">
            <h1 className="text-[56px] font-bold text-[#111] leading-[1.2] tracking-[-2px] mb-6">
              아주대학교 구성원을 위한
              <br />
              포트폴리오 관리 플랫폼
            </h1>
            <p className="text-[20px] text-[#666] leading-[1.6] max-w-2xl mx-auto">
              프로젝트부터 취업까지, 당신의 모든 성과를 체계적으로 관리하고 공유하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - 삼성자산운용 스타일 */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-[40px] font-bold text-[#111] text-center mb-16 tracking-[-1.5px]">
            AIM AJOU 현황
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="flex justify-center mb-4 text-[#004a9c]">
                    {stat.icon}
                  </div>
                  <div className="text-[48px] font-bold text-[#111] mb-1 tracking-tight">
                    {stat.value}
                    <span className="text-[28px] ml-1">{stat.unit}</span>
                  </div>
                  <div className="text-[14px] text-[#666]">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#111] mb-4 tracking-[-1.5px]">
              AIM AJOU란?
            </h2>
            <p className="text-[18px] text-[#666] max-w-2xl mx-auto">
              <strong className="text-[#004a9c]">Ajou Integrated Management</strong>의 약자로,
              아주대학교 구성원들의 학업 성과와 경력을 통합 관리하는 플랫폼입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#004a9c] rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-[20px] text-[#111]">우리의 목표</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[15px] text-[#666] leading-[1.7]">
                  학생들의 다양한 성과를 체계적으로 관리하고, 이를 바탕으로 더 나은 커리어 기회를 제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#004a9c] rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-[20px] text-[#111]">해결하는 문제</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[15px] text-[#666] leading-[1.7]">
                  흩어진 프로젝트 파일, 잊혀진 수상 경력, 정리되지 않은 활동 내역 등 관리의 어려움을 해결합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-[#004a9c] rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-[20px] text-[#111]">우리의 비전</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[15px] text-[#666] leading-[1.7]">
                  아주대학교를 넘어 대한민국 대학의 표준 포트폴리오 플랫폼으로 성장하는 것을 목표로 합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#111] mb-4 tracking-[-1.5px]">
              이렇게 이용하세요
            </h2>
            <p className="text-[18px] text-[#666]">
              간단한 4단계로 포트폴리오 관리를 시작할 수 있습니다
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[36px] font-bold text-[#004a9c]/30 leading-none">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 bg-[#004a9c] rounded-lg flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  <CardTitle className="text-[18px] text-[#111]">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[14px] text-[#666] leading-[1.6]">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#111] mb-4 tracking-[-1.5px]">
              주요 기능
            </h2>
            <p className="text-[18px] text-[#666]">
              AIM AJOU가 제공하는 핵심 기능들을 만나보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#004a9c] rounded-lg flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-[22px] text-[#111] mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-[15px] text-[#666] leading-[1.6]">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#004a9c] flex-shrink-0 mt-0.5" />
                        <span className="text-[14px] text-[#666] leading-[1.5]">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#111] mb-4 tracking-[-1.5px]">
              왜 AIM AJOU인가요?
            </h2>
            <p className="text-[18px] text-[#666]">
              다른 포트폴리오 도구와 차별화되는 AIM AJOU만의 장점
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 bg-[#004a9c]/10 rounded-lg flex items-center justify-center mb-4 text-[#004a9c]">
                    {advantage.icon}
                  </div>
                  <CardTitle className="text-[20px] text-[#111]">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[15px] text-[#666] leading-[1.7]">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-[1200px] px-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#004a9c] to-[#0056b8]">
            <CardContent className="py-16 text-center">
              <h2 className="text-[40px] font-bold text-white mb-4 tracking-[-1.5px]">
                지금 바로 시작하세요
              </h2>
              <p className="text-[18px] text-white/90 mb-10 max-w-2xl mx-auto">
                AIM AJOU와 함께 당신의 성과를 체계적으로 관리하고, 더 나은 미래를 준비하세요.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-white text-[#004a9c] px-8 py-4 rounded-lg text-[16px] font-semibold hover:bg-gray-100 transition-all shadow-md"
                >
                  무료로 시작하기
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg text-[16px] font-semibold hover:bg-white/10 transition-all"
                >
                  포트폴리오 둘러보기
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
