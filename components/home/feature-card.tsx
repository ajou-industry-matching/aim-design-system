import Image from "next/image";

type FeatureCardVariant = "portfolio" | "feature" | "academic" | "career";

interface FeatureCardProps {
  variant: FeatureCardVariant;
}

const variants = {
  portfolio: {
    bg: "bg-[#1e3a8a]",
    badge: "PORTFOLIO",
    title: "아주인의 성장을 기록하는\n공식 포트폴리오 플랫폼",
    subtitle: "AJOU Portfolio Service",
    description: "수업, 프로젝트, 비교과 활동까지 아주대 학생의 모든 성과를 하나로 관리합니다.",
    icon: "/assets/hero-icon-1.png",
    iconWidth: 200,
    iconHeight: 200,
  },
  feature: {
    bg: "bg-[#4f46e5]",
    badge: "FEATURE",
    title: "활동은 자유롭게,\n정리는 체계적으로",
    subtitle: "성과 중심 포트폴리오 관리",
    description: "활동을 입력하면 역할과 기여도가 정리되어 읽기 쉬운 포트폴리오로 구성됩니다.",
    icon: "/assets/hero-icon-2.png",
    iconWidth: 182,
    iconHeight: 200,
  },
  academic: {
    bg: "bg-[#334155]",
    badge: "FOR ACADEMIC",
    title: "교수에게는 한눈에,\n기업에게는 명확하게",
    subtitle: "제출·검토·공유를 위한 포트폴리오",
    description: "과제 제출, 추천, 채용 활용까지 목적에 맞게 포트폴리오를 공유하세요.",
    icon: "/assets/hero-icon-3.png",
    iconWidth: 200,
    iconHeight: 200,
  },
  career: {
    bg: "bg-[#2563eb]",
    badge: "FOR CAREER",
    title: "나의 성과를\n진로와 연결하세요",
    subtitle: "대외 제출용 포트폴리오",
    description: "인턴십, 공모전, 채용 지원 시 신뢰도 있는 포트폴리오로 활용할 수 있습니다.",
    icon: "/assets/hero-icon-4.png",
    iconWidth: 200,
    iconHeight: 200,
  },
};

export function FeatureCard({ variant }: FeatureCardProps) {
  const config = variants[variant];

  return (
    <div
      className={`${config.bg} flex flex-col gap-[26px] items-end overflow-hidden p-6 rounded-3xl h-[460px]`}
    >
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex items-start">
          <div className="border border-[#f9f9f9] flex items-center justify-center px-3 py-1 rounded-xl">
            <span className="text-[#f9f9f9] text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
              {config.badge}
            </span>
          </div>
        </div>
        <p className="text-[#f9f9f9] text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] whitespace-pre-line">
          {config.title}
        </p>
        <p className="text-[#f9f9f9] text-[18px] font-semibold leading-[1.44] tracking-[-0.45px]">
          {config.subtitle}
        </p>
        <p className="text-[#f9f9f9] text-[16px] leading-[1.5] tracking-[-0.4px]">
          {config.description}
        </p>
      </div>
      <div className="relative" style={{ width: config.iconWidth, height: config.iconHeight }}>
        <Image
          src={config.icon}
          alt={config.badge}
          width={config.iconWidth}
          height={config.iconHeight}
          className="object-cover"
        />
      </div>
    </div>
  );
}
