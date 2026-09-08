/**
 * 크롤링 프로젝트 도메인 타입
 *
 * 백엔드 실제 스펙 기준 (AIM API / OpenAPI)
 * - GET  /api/crawled-projects/my                     내가 참여한 크롤링 프로젝트 목록
 * - GET  /api/crawled-projects/{projectId}            크롤링 프로젝트 상세
 * - POST /api/crawled-projects/{projectId}/portfolio  포트폴리오로 가져오기
 */

/** 프로젝트 참여자 (CrawledProjectMemberResponse) */
export interface CrawledProjectMember {
  /** 참여자 역할 */
  role: string;
  /** 이름 */
  name: string;
  /** 마스킹된 이메일 */
  maskedEmail: string;
  /** 학과 */
  department: string;
  /** 학년 */
  grade: string;
}

/** 크롤링 프로젝트 (CrawledProjectResponse) */
export interface CrawledProject {
  /** 크롤링 프로젝트 ID */
  crawledProjectId: number;
  /** 원본 프로젝트 식별자 */
  sourceUid: string;
  /** 크롤링 기간 또는 학기 */
  term: string;
  /** 프로젝트 제목 */
  title: string;
  /** 프로젝트 요약 */
  summary: string;
  /** 프로젝트 설명 */
  description: string;
  /** 프로젝트 본문 */
  content: string;
  /** 원본 프로젝트 URL */
  sourceUrl: string;
  /** 발표 자료 URL */
  presentationUrl: string;
  /** 영상 URL */
  videoUrl: string;
  /** GitHub URL */
  githubUrl: string;
  /** 대표 이미지 URL */
  representativeImage: string;
  /** 프로젝트 카테고리 */
  category: string;
  /** 프로젝트 참여자 목록 */
  members: CrawledProjectMember[];
  /** 프로젝트 생성일시 (ISO 8601) */
  createdAt: string;
}

/** 운영상 사용되는 카테고리 값 */
export const PROJECT_CATEGORIES = [
  "소프트웨어",
  "사이버보안",
  "AI융합",
  "미디어",
  "자기주도연구",
  "자기주도프로젝트",
] as const;

/** ISO 8601 날짜를 목록 표시용으로 변환 */
export const formatCrawledDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("ko-KR");

/** 참여자 목록을 목록 표시용으로 축약 */
export const formatMembers = (members: CrawledProjectMember[]) => {
  if (members.length === 0) return "-";
  const [first, ...rest] = members;
  return rest.length > 0 ? `${first.name} 외 ${rest.length}명` : first.name;
};

/**
 * 목업 데이터
 * TODO: GET /api/crawled-projects/my 연동 시 교체.
 */
export const mockCrawledProjects: CrawledProject[] = [
  {
    crawledProjectId: 1,
    sourceUid: "2026-1-SW-014",
    term: "2026-1학기",
    title: "캡스톤디자인 - 교내 중고거래 플랫폼",
    summary: "아주대 학생 간 중고 물품 거래를 지원하는 웹 서비스",
    description:
      "교내 구성원 인증을 기반으로 안전한 중고거래 환경을 제공하는 플랫폼입니다.",
    content: "## 프로젝트 개요\n\n교내 구성원만 참여할 수 있는 중고거래 플랫폼입니다.",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2026-1-SW-014",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2026-1-SW-014.pdf",
    videoUrl: "https://youtube.com/watch?v=sample-014",
    githubUrl: "https://github.com/ajou-example/campus-market",
    representativeImage: "https://picsum.photos/seed/ajou-capstone/800/600",
    category: "소프트웨어",
    members: [
      {
        role: "팀장",
        name: "김철수",
        maskedEmail: "chul****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "4",
      },
      {
        role: "팀원",
        name: "이영희",
        maskedEmail: "youn****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "3",
      },
    ],
    createdAt: "2026-03-02T09:12:00",
  },
  {
    crawledProjectId: 2,
    sourceUid: "2026-1-SEC-007",
    term: "2026-1학기",
    title: "웹 취약점 자동 진단 도구 개발",
    summary: "OWASP Top 10 기반 자동 스캐너",
    description:
      "웹 애플리케이션의 주요 취약점을 자동으로 탐지하고 리포트를 생성합니다.",
    content: "## 프로젝트 개요\n\nOWASP Top 10 항목을 자동 점검하는 스캐너입니다.",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2026-1-SEC-007",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2026-1-SEC-007.pdf",
    videoUrl: "https://youtube.com/watch?v=sample-007",
    githubUrl: "https://github.com/ajou-example/web-scanner",
    representativeImage: "https://picsum.photos/seed/ajou-security/800/600",
    category: "사이버보안",
    members: [
      {
        role: "팀장",
        name: "박민수",
        maskedEmail: "mins****@ajou.ac.kr",
        department: "사이버보안학과",
        grade: "4",
      },
    ],
    createdAt: "2026-03-02T09:12:00",
  },
  {
    crawledProjectId: 3,
    sourceUid: "2026-1-AI-021",
    term: "2026-1학기",
    title: "LLM 기반 학사 상담 챗봇",
    summary: "학사 규정 문서를 학습한 상담 챗봇",
    description: "학사 규정과 공지사항을 검색해 학생 문의에 답변하는 챗봇입니다.",
    content: "## 프로젝트 개요\n\nRAG 구조로 학사 규정 문서를 검색해 답변합니다.",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2026-1-AI-021",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2026-1-AI-021.pdf",
    videoUrl: "https://youtube.com/watch?v=sample-021",
    githubUrl: "https://github.com/ajou-example/academic-chatbot",
    representativeImage: "https://picsum.photos/seed/ajou-ai/800/600",
    category: "AI융합",
    members: [
      {
        role: "팀장",
        name: "최지은",
        maskedEmail: "jieu****@ajou.ac.kr",
        department: "인공지능융합학과",
        grade: "4",
      },
      {
        role: "팀원",
        name: "정우성",
        maskedEmail: "woos****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "3",
      },
      {
        role: "팀원",
        name: "김철수",
        maskedEmail: "chul****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "4",
      },
    ],
    createdAt: "2026-02-27T14:30:00",
  },
  {
    crawledProjectId: 4,
    sourceUid: "2025-2-MED-003",
    term: "2025-2학기",
    title: "인터랙티브 미디어 아트 전시 프로젝트",
    summary: "관람객 동작에 반응하는 미디어 아트",
    description: "센서로 관람객의 움직임을 인식해 영상이 실시간으로 변화합니다.",
    content: "## 프로젝트 개요\n\n관람객 동작을 인식해 반응하는 전시형 미디어 아트입니다.",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2025-2-MED-003",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2025-2-MED-003.pdf",
    videoUrl: "https://youtube.com/watch?v=sample-003",
    githubUrl: "https://github.com/ajou-example/media-art",
    representativeImage: "https://picsum.photos/seed/ajou-media/800/600",
    category: "미디어",
    members: [
      {
        role: "팀장",
        name: "이영희",
        maskedEmail: "youn****@ajou.ac.kr",
        department: "미디어학과",
        grade: "3",
      },
    ],
    createdAt: "2026-02-27T14:30:00",
  },
  {
    crawledProjectId: 5,
    sourceUid: "2025-2-RES-011",
    term: "2025-2학기",
    title: "그래프 신경망 기반 추천 알고리즘 연구",
    summary: "GNN을 활용한 콘텐츠 추천 성능 개선 연구",
    description: "사용자-아이템 상호작용 그래프를 학습해 추천 정확도를 개선했습니다.",
    content: "## 연구 개요\n\nGNN 기반 추천 모델의 성능을 기존 기법과 비교했습니다.",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2025-2-RES-011",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2025-2-RES-011.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/gnn-recsys",
    representativeImage: "https://picsum.photos/seed/ajou-research/800/600",
    category: "자기주도연구",
    members: [
      {
        role: "연구책임",
        name: "정우성",
        maskedEmail: "woos****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "4",
      },
    ],
    createdAt: "2026-02-20T11:05:00",
  },
  {
    crawledProjectId: 6,
    sourceUid: "2025-2-PRJ-042",
    term: "2025-2학기",
    title: "아주대 학식 알리미 모바일 앱",
    summary: "교내 식당 메뉴를 알려주는 모바일 앱",
    description: "매일 학식 메뉴를 크롤링해 푸시 알림으로 제공하는 앱입니다.",
    content: "## 프로젝트 개요\n\n교내 식당 메뉴를 수집해 알림으로 전달합니다.",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2025-2-PRJ-042",
    presentationUrl: "",
    videoUrl: "https://youtube.com/watch?v=sample-042",
    githubUrl: "https://github.com/ajou-example/ajou-meal",
    representativeImage: "https://picsum.photos/seed/ajou-project/800/600",
    category: "자기주도프로젝트",
    members: [
      {
        role: "팀장",
        name: "김철수",
        maskedEmail: "chul****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "4",
      },
      {
        role: "팀원",
        name: "박민수",
        maskedEmail: "mins****@ajou.ac.kr",
        department: "사이버보안학과",
        grade: "3",
      },
    ],
    createdAt: "2026-02-20T11:05:00",
  },
  {
    crawledProjectId: 7,
    sourceUid: "2025-1-SW-028",
    term: "2025-1학기",
    title: "실시간 협업 화이트보드 서비스",
    summary: "WebRTC 기반 다중 사용자 드로잉 도구",
    description: "여러 사용자가 동시에 그림을 그리고 공유할 수 있는 협업 도구입니다.",
    content: "## 프로젝트 개요\n\nWebRTC 기반 다중 사용자 드로잉 도구",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2025-1-SW-028",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2025-1-SW-028.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/sw-whiteboard",
    representativeImage: "https://picsum.photos/seed/ajou-sw-whiteboard/800/600",
    category: "소프트웨어",
    members: [
      {
        role: "팀장",
        name: "한지민",
        maskedEmail: "jimi****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "4",
      },
      {
        role: "팀원",
        name: "오세훈",
        maskedEmail: "sehu****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "3",
      },
    ],
    createdAt: "2026-02-13T10:00:00",
  },
  {
    crawledProjectId: 8,
    sourceUid: "2025-1-SEC-015",
    term: "2025-1학기",
    title: "악성코드 정적 분석 자동화 파이프라인",
    summary: "PE 파일 특징 추출 및 분류 시스템",
    description: "악성코드 샘플의 정적 특징을 추출해 자동 분류하는 파이프라인입니다.",
    content: "## 프로젝트 개요\n\nPE 파일 특징 추출 및 분류 시스템",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2025-1-SEC-015",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2025-1-SEC-015.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/sec-malware",
    representativeImage: "https://picsum.photos/seed/ajou-sec-malware/800/600",
    category: "사이버보안",
    members: [
      {
        role: "팀장",
        name: "서준호",
        maskedEmail: "junh****@ajou.ac.kr",
        department: "사이버보안학과",
        grade: "4",
      },
    ],
    createdAt: "2026-02-13T10:00:00",
  },
  {
    crawledProjectId: 9,
    sourceUid: "2025-1-AI-009",
    term: "2025-1학기",
    title: "수어 인식 기반 실시간 자막 생성기",
    summary: "영상 속 수어를 텍스트로 변환",
    description: "카메라 입력에서 수어 동작을 인식해 실시간 자막을 생성합니다.",
    content: "## 프로젝트 개요\n\n영상 속 수어를 텍스트로 변환",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2025-1-AI-009",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2025-1-AI-009.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/ai-sign",
    representativeImage: "https://picsum.photos/seed/ajou-ai-sign/800/600",
    category: "AI융합",
    members: [
      {
        role: "팀장",
        name: "윤아름",
        maskedEmail: "arum****@ajou.ac.kr",
        department: "인공지능융합학과",
        grade: "3",
      },
      {
        role: "팀원",
        name: "강민재",
        maskedEmail: "minj****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "4",
      },
    ],
    createdAt: "2026-02-06T15:20:00",
  },
  {
    crawledProjectId: 10,
    sourceUid: "2025-1-MED-021",
    term: "2025-1학기",
    title: "가상현실 캠퍼스 투어 콘텐츠",
    summary: "VR로 둘러보는 아주대 캠퍼스",
    description: "360도 영상과 3D 모델로 캠퍼스를 체험하는 VR 콘텐츠입니다.",
    content: "## 프로젝트 개요\n\nVR로 둘러보는 아주대 캠퍼스",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2025-1-MED-021",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2025-1-MED-021.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/med-vr",
    representativeImage: "https://picsum.photos/seed/ajou-med-vr/800/600",
    category: "미디어",
    members: [
      {
        role: "팀장",
        name: "노유진",
        maskedEmail: "yuji****@ajou.ac.kr",
        department: "미디어학과",
        grade: "4",
      },
    ],
    createdAt: "2026-02-06T15:20:00",
  },
  {
    crawledProjectId: 11,
    sourceUid: "2024-2-RES-004",
    term: "2024-2학기",
    title: "저전력 엣지 디바이스 추론 최적화 연구",
    summary: "경량화 모델의 엣지 배포 성능 분석",
    description: "양자화와 프루닝을 적용해 엣지 환경 추론 지연을 개선했습니다.",
    content: "## 프로젝트 개요\n\n경량화 모델의 엣지 배포 성능 분석",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2024-2-RES-004",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2024-2-RES-004.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/res-edge",
    representativeImage: "https://picsum.photos/seed/ajou-res-edge/800/600",
    category: "자기주도연구",
    members: [
      {
        role: "연구책임",
        name: "임태현",
        maskedEmail: "taeh****@ajou.ac.kr",
        department: "전자공학과",
        grade: "4",
      },
    ],
    createdAt: "2026-01-30T09:45:00",
  },
  {
    crawledProjectId: 12,
    sourceUid: "2024-2-PRJ-033",
    term: "2024-2학기",
    title: "교내 분실물 매칭 서비스",
    summary: "습득물과 분실 신고를 자동 매칭",
    description: "이미지 유사도로 분실물과 습득물을 매칭해 알려주는 서비스입니다.",
    content: "## 프로젝트 개요\n\n습득물과 분실 신고를 자동 매칭",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2024-2-PRJ-033",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2024-2-PRJ-033.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/prj-lost",
    representativeImage: "https://picsum.photos/seed/ajou-prj-lost/800/600",
    category: "자기주도프로젝트",
    members: [
      {
        role: "팀장",
        name: "배수현",
        maskedEmail: "suhy****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "3",
      },
      {
        role: "팀원",
        name: "조은결",
        maskedEmail: "engy****@ajou.ac.kr",
        department: "산업공학과",
        grade: "3",
      },
    ],
    createdAt: "2026-01-30T09:45:00",
  },
  {
    crawledProjectId: 13,
    sourceUid: "2024-2-SW-041",
    term: "2024-2학기",
    title: "오픈소스 기여 이력 시각화 대시보드",
    summary: "GitHub 활동을 한눈에 보는 대시보드",
    description: "커밋과 PR 이력을 수집해 기여도를 시각화하는 대시보드입니다.",
    content: "## 프로젝트 개요\n\nGitHub 활동을 한눈에 보는 대시보드",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2024-2-SW-041",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2024-2-SW-041.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/sw-oss",
    representativeImage: "https://picsum.photos/seed/ajou-sw-oss/800/600",
    category: "소프트웨어",
    members: [
      {
        role: "팀장",
        name: "문가온",
        maskedEmail: "gaon****@ajou.ac.kr",
        department: "소프트웨어학과",
        grade: "4",
      },
    ],
    createdAt: "2026-01-23T13:10:00",
  },
  {
    crawledProjectId: 14,
    sourceUid: "2024-1-AI-017",
    term: "2024-1학기",
    title: "강화학습 기반 교내 셔틀버스 배차 최적화",
    summary: "대기 시간을 줄이는 배차 알고리즘",
    description: "승객 수요 패턴을 학습해 셔틀버스 배차 간격을 최적화했습니다.",
    content: "## 프로젝트 개요\n\n대기 시간을 줄이는 배차 알고리즘",
    sourceUrl: "https://softcon.ajou.ac.kr/works/works.asp?uid=2024-1-AI-017",
    presentationUrl: "https://softcon.ajou.ac.kr/files/2024-1-AI-017.pdf",
    videoUrl: "",
    githubUrl: "https://github.com/ajou-example/ai-shuttle",
    representativeImage: "https://picsum.photos/seed/ajou-ai-shuttle/800/600",
    category: "AI융합",
    members: [
      {
        role: "팀장",
        name: "신도윤",
        maskedEmail: "doyu****@ajou.ac.kr",
        department: "인공지능융합학과",
        grade: "4",
      },
      {
        role: "팀원",
        name: "황리아",
        maskedEmail: "riaa****@ajou.ac.kr",
        department: "산업공학과",
        grade: "3",
      },
    ],
    createdAt: "2026-01-23T13:10:00",
  },
];
