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
];
