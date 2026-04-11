"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";

// ─────────────────────────────────────────────
// Spec Utilities
// ─────────────────────────────────────────────
const getPxValue = (className: string) => {
  const match = className.match(/-(?:(\d+)|\[(\d+)px\])$/);
  if (!match) return null;
  if (match[2]) return `${match[2]}px`;
  const val = parseInt(match[1]);
  if (isNaN(val)) return null;
  return `${val * 4}px`;
};

const parseClasses = (className: string) => {
  const classes = className.split(" ");
  return {
    padding: classes.filter((c) => /^p[xytblr]?-/.test(c)),
    margin: classes.filter((c) => /^m[xytblr]?-/.test(c)),
    gap: classes.filter((c) => /^gap-/.test(c)),
    dimensions: classes.filter((c) => /^(w-|h-|max-w|min-h|max-h|flex-1|flex)/.test(c)),
    border: classes.filter((c) => /^border/.test(c)),
    rounded: classes.filter((c) => /^rounded/.test(c)),
    typography: classes.filter((c) => /^(text-|font-|leading-|tracking-)/.test(c)),
    background: classes.filter((c) => /^bg-/.test(c)),
  };
};

const SpecBadge = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-600 text-white rounded-full text-[11px] font-bold ml-2 z-50 relative shrink-0">
    {num}
  </span>
);

const SpecDetail = ({
  num,
  className,
  label,
  note,
}: {
  num: number;
  className: string;
  label: string;
  note?: string;
}) => {
  const { padding, margin, gap, dimensions, border, rounded, typography, background } =
    parseClasses(className);
  return (
    <div className="bg-white border-2 border-teal-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-teal-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-teal-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">
            {num}
          </span>
          {label}
        </span>
        {note && <span className="text-teal-200 text-[11px] font-normal">{note}</span>}
      </div>
      <div className="p-3 space-y-2.5 text-[11px]">
        {(padding.length > 0 || margin.length > 0 || gap.length > 0) && (
          <div className="space-y-1">
            <div className="text-orange-700 font-bold text-[10px] uppercase tracking-wider">
              📐 Spacing
            </div>
            <div className="flex flex-wrap gap-1">
              {[...padding, ...margin, ...gap].map((c, i) => (
                <span
                  key={i}
                  className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                >
                  {c} {getPxValue(c) && <span className="text-orange-600">({getPxValue(c)})</span>}
                </span>
              ))}
            </div>
          </div>
        )}
        {dimensions.length > 0 && (
          <div className="space-y-1">
            <div className="text-blue-700 font-bold text-[10px] uppercase tracking-wider">
              📏 Size
            </div>
            <div className="bg-blue-50 text-blue-900 px-2 py-1 rounded font-mono text-[10px]">
              {dimensions.join(" ")}
            </div>
          </div>
        )}
        {(border.length > 0 || rounded.length > 0 || background.length > 0) && (
          <div className="space-y-1">
            <div className="text-purple-700 font-bold text-[10px] uppercase tracking-wider">
              🎨 Style
            </div>
            <div className="bg-purple-50 text-purple-900 px-2 py-1 rounded font-mono text-[10px]">
              {[...border, ...rounded, ...background].join(" ")}
            </div>
          </div>
        )}
        {typography.length > 0 && (
          <div className="space-y-1">
            <div className="text-green-700 font-bold text-[10px] uppercase tracking-wider">
              ✍️ Text
            </div>
            <div className="bg-green-50 text-green-900 px-2 py-1 rounded font-mono text-[10px]">
              {typography.join(" ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// 공통 select 스타일
// ─────────────────────────────────────────────
const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50 disabled:bg-[#f5f5f5]";

// ─────────────────────────────────────────────
// 공통 페이지 헤더 (뷰/편집 공통)
// ─────────────────────────────────────────────
function PageHeader({ mode }: { mode: "view" | "edit" }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-[40px] w-[40px] border-[#e5e5e5]">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-[32px] font-bold text-[#111] flex items-center">
            사용자 상세 정보 <SpecBadge num={1} />
          </h1>
          <p className="text-[14px] text-[#666] flex items-center">
            사용자 정보를 조회하고 수정할 수 있습니다. <SpecBadge num={2} />
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {mode === "edit" ? (
          <>
            <Button variant="outline" className="border border-[#e5e5e5] text-[#111] h-[40px] rounded-lg px-6 text-[14px] font-medium">
              취소 <SpecBadge num={3} />
            </Button>
            <Button className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 text-[14px] font-medium">
              저장 <SpecBadge num={4} />
            </Button>
          </>
        ) : (
          <Button className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 text-[14px] font-medium">
            수정 <SpecBadge num={3} />
          </Button>
        )}
        <Button variant="outline" className="border border-red-500 text-red-500 h-[40px] rounded-lg px-6 text-[14px] font-medium gap-2">
          <Trash2 size={18} />
          삭제 <SpecBadge num={mode === "edit" ? 5 : 4} />
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 케이스 구분선
// ─────────────────────────────────────────────
function CaseDivider({ label }: { label: string }) {
  return (
    <div className="border-t-4 border-dashed border-gray-200 pt-14 mt-14">
      <h3 className="text-xl font-bold mb-8 text-gray-400 uppercase tracking-widest text-center">
        {label}
      </h3>
    </div>
  );
}

export default function AdminUserDetailPageFigma() {
  return (
    <div className="bg-white min-h-screen">
      {/* Spec Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 사용자 상세 정보</h2>
        <div className="flex gap-6 text-sm mt-2 text-teal-50">
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-orange-100 border border-orange-600" /> Spacing</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-100 border border-blue-600" /> Size</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-100 border border-purple-600" /> Style</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-100 border border-green-600" /> Text</span>
        </div>
      </div>

      <div className="flex max-w-[1900px] mx-auto">
        {/* ── Left: UI Preview (모든 케이스) ── */}
        <div className="flex-1 p-8 bg-gray-50 space-y-0">

          {/* ════════════════════════════════════
              CASE A — View Mode: 슈퍼관리자
          ════════════════════════════════════ */}
          <div>
            <div className="text-center mb-6">
              <span className="inline-block bg-red-100 text-red-700 font-bold text-sm px-4 py-1.5 rounded-full">
                CASE A — View: 슈퍼관리자
              </span>
            </div>
            <div className="bg-white border rounded-xl p-8 shadow-sm space-y-6">
              <PageHeader mode="view" />
              <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
                <h2 className="text-[20px] font-semibold text-[#111] mb-6 flex items-center">
                  기본 정보 <SpecBadge num={5} />
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center">이름 <SpecBadge num={6} /></Label>
                    <Input value="김관리자" disabled className="bg-[#f5f5f5]" />
                  </div>
                  <div className="space-y-2">
                    <Label>이메일</Label>
                    <Input value="super@ajou.ac.kr" disabled className="bg-[#f5f5f5]" />
                  </div>
                  {/* 역할 — 슈퍼관리자 */}
                  <div className="space-y-2">
                    <Label className="flex items-center">역할 <SpecBadge num={7} /></Label>
                    <select disabled className={selectClass} defaultValue="슈퍼관리자">
                      <option>슈퍼관리자</option>
                      <option>학생</option>
                      <option>교수</option>
                      <option>기업</option>
                    </select>
                  </div>
                  {/* 관리자 권한 — 비활성 (슈퍼관리자이므로 select 자체 disabled) */}
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      관리자 권한 <SpecBadge num={8} />
                    </Label>
                    <select disabled className={selectClass} defaultValue="없음">
                      <option>없음</option>
                      <option>일반관리자</option>
                    </select>
                    <p className="text-[11px] text-[#aaa]">슈퍼관리자는 역할에서 직접 변경하세요.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>게시글 수</Label>
                    <Input value="0" disabled className="bg-[#f5f5f5]" />
                  </div>
                  <div className="space-y-2">
                    <Label>마지막 활동</Label>
                    <Input value="2025.01.20" disabled className="bg-[#f5f5f5]" />
                  </div>
                  <div className="space-y-2">
                    <Label>가입일</Label>
                    <Input value="2023.03.01" disabled className="bg-[#f5f5f5]" />
                  </div>
                  <div className="space-y-2">
                    <Label>상태</Label>
                    <Input value="정상" disabled className="bg-[#f5f5f5]" />
                  </div>
                  <div className="space-y-2">
                    <Label>사용자 ID</Label>
                    <Input value="1" disabled className="bg-[#f5f5f5]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════
              CASE B — View Mode: 학생 (비관리자)
          ════════════════════════════════════ */}
          <CaseDivider label="CASE B — View: 학생 (비관리자)" />
          <div className="bg-white border rounded-xl p-8 shadow-sm space-y-6">
            <PageHeader mode="view" />
            <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
              <h2 className="text-[20px] font-semibold text-[#111] mb-6">기본 정보</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>이름</Label>
                  <Input value="박학생" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>이메일</Label>
                  <Input value="student@ajou.ac.kr" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>역할</Label>
                  <select disabled className={selectClass} defaultValue="학생">
                    <option>슈퍼관리자</option>
                    <option>학생</option>
                    <option>교수</option>
                    <option>기업</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>
                    관리자 권한
                    <span className="ml-2 text-[11px] text-[#aaa] font-normal">(슈퍼관리자만 변경 가능)</span>
                  </Label>
                  <select disabled className={selectClass} defaultValue="없음">
                    <option>없음</option>
                    <option>일반관리자</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>게시글 수</Label>
                  <Input value="12" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>마지막 활동</Label>
                  <Input value="2025.01.19" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>가입일</Label>
                  <Input value="2024.03.02" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>상태</Label>
                  <Input value="정상" disabled className="bg-[#f5f5f5]" />
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════
              CASE C — Edit Mode: 슈퍼관리자가 학생을 일반관리자로 임명
          ════════════════════════════════════ */}
          <CaseDivider label="CASE C — Edit: 슈퍼관리자 → 학생에게 일반관리자 부여" />
          <div className="bg-white border rounded-xl p-8 shadow-sm space-y-6">
            <PageHeader mode="edit" />
            <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
              <h2 className="text-[20px] font-semibold text-[#111] mb-6">기본 정보</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>이름</Label>
                  <Input defaultValue="박학생" />
                </div>
                <div className="space-y-2">
                  <Label>이메일</Label>
                  <Input defaultValue="student@ajou.ac.kr" />
                </div>
                {/* 역할 — 편집 활성화 */}
                <div className="space-y-2">
                  <Label className="flex items-center">역할 <SpecBadge num={9} /></Label>
                  <select className={selectClass} defaultValue="학생">
                    <option>슈퍼관리자</option>
                    <option>학생</option>
                    <option>교수</option>
                    <option>기업</option>
                  </select>
                </div>
                {/* 관리자 권한 — 슈퍼관리자 로그인 시 활성화, 일반관리자 선택됨 */}
                <div className="space-y-2">
                  <Label className="flex items-center">관리자 권한 <SpecBadge num={10} /></Label>
                  <select className={selectClass} defaultValue="일반관리자">
                    <option>없음</option>
                    <option>일반관리자</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>게시글 수</Label>
                  <Input value="12" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>마지막 활동</Label>
                  <Input value="2025.01.19" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>가입일</Label>
                  <Input value="2024.03.02" disabled className="bg-[#f5f5f5]" />
                </div>
                {/* 상태 + 정지 버튼 */}
                <div className="space-y-2">
                  <Label className="flex items-center">상태 <SpecBadge num={11} /></Label>
                  <div className="flex items-center gap-3">
                    <Input value="정상" disabled className="bg-[#f5f5f5]" />
                    <Button variant="outline" className="h-[36px] rounded-lg px-4 text-[14px] font-medium border-red-500 text-red-500 hover:bg-red-500/5 shrink-0">
                      정지
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════
              CASE D — Edit Mode: 슈퍼관리자로 역할 변경 (관리자 권한 select 비활성화)
          ════════════════════════════════════ */}
          <CaseDivider label="CASE D — Edit: 역할을 슈퍼관리자로 변경 시 관리자 권한 비활성" />
          <div className="bg-white border rounded-xl p-8 shadow-sm space-y-6">
            <PageHeader mode="edit" />
            <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
              <h2 className="text-[20px] font-semibold text-[#111] mb-6">기본 정보</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>이름</Label>
                  <Input defaultValue="이교수" />
                </div>
                <div className="space-y-2">
                  <Label>이메일</Label>
                  <Input defaultValue="prof@ajou.ac.kr" />
                </div>
                {/* 역할 — 슈퍼관리자 선택 */}
                <div className="space-y-2">
                  <Label className="flex items-center">역할 <SpecBadge num={12} /></Label>
                  <select className={selectClass} defaultValue="슈퍼관리자">
                    <option>슈퍼관리자</option>
                    <option>학생</option>
                    <option>교수</option>
                    <option>기업</option>
                  </select>
                </div>
                {/* 관리자 권한 — 슈퍼관리자 선택 시 자동 비활성화 */}
                <div className="space-y-2">
                  <Label className="flex items-center">관리자 권한 <SpecBadge num={13} /></Label>
                  <select disabled className={selectClass} defaultValue="없음">
                    <option>없음</option>
                    <option>일반관리자</option>
                  </select>
                  <p className="text-[11px] text-[#aaa]">슈퍼관리자는 역할에서 직접 변경하세요.</p>
                </div>
                <div className="space-y-2">
                  <Label>게시글 수</Label>
                  <Input value="5" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>마지막 활동</Label>
                  <Input value="2025.01.19" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>가입일</Label>
                  <Input value="2023.09.01" disabled className="bg-[#f5f5f5]" />
                </div>
                <div className="space-y-2">
                  <Label>상태</Label>
                  <div className="flex items-center gap-3">
                    <Input value="정상" disabled className="bg-[#f5f5f5]" />
                    <Button variant="outline" className="h-[36px] rounded-lg px-4 text-[14px] font-medium border-red-500 text-red-500 hover:bg-red-500/5 shrink-0">
                      정지
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right: Spec Details ── */}
        <div className="w-[460px] p-8 bg-teal-50 border-l-4 border-teal-500 overflow-auto">
          <h3 className="text-teal-900 font-bold text-lg mb-6">📋 컴포넌트 스펙</h3>

          <SpecDetail num={1} className="text-[32px] font-bold text-[#111]" label="Page Title" note="32px / Bold 700" />
          <SpecDetail num={2} className="text-[14px] text-[#666]" label="Page Subtitle" note="14px / Color #666" />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">🔘 View Mode 버튼</h4>
          </div>
          <SpecDetail num={3} className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 text-[14px] font-medium" label="수정 Button" note="Bg #004a9c / h 40px" />
          <SpecDetail num={4} className="border border-red-500 text-red-500 h-[40px] rounded-lg px-6 text-[14px] font-medium" label="삭제 Button" note="Border red-500 / h 40px" />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">📋 기본 정보 카드</h4>
          </div>
          <SpecDetail num={5} className="text-[20px] font-semibold text-[#111]" label="Section Title" note="20px / Semibold 600" />
          <SpecDetail num={6} className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm" label="Input (Disabled)" note="Bg #f5f5f5 / h 36px" />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">🏷️ 역할·관리자 Select (View)</h4>
          </div>
          <SpecDetail
            num={7}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm disabled:opacity-50 disabled:bg-[#f5f5f5]"
            label="역할 Select (Disabled)"
            note="options: 슈퍼관리자 | 학생 | 교수 | 기업"
          />
          <SpecDetail
            num={8}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm disabled:opacity-50 disabled:bg-[#f5f5f5]"
            label="관리자 권한 Select (Disabled)"
            note="options: 없음 | 일반관리자"
          />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">✏️ Edit Mode — Select 활성화</h4>
          </div>
          <SpecDetail
            num={9}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            label="역할 Select (Enabled)"
            note="슈퍼관리자 / 학생 / 교수 / 기업"
          />
          <SpecDetail
            num={10}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            label="관리자 권한 Select (Enabled)"
            note="슈퍼관리자만 편집 가능 · 없음 / 일반관리자"
          />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">🔴 상태 정지 버튼</h4>
          </div>
          <SpecDetail
            num={11}
            className="h-[36px] rounded-lg px-4 text-[14px] font-medium border-red-500 text-red-500"
            label="정지 Button (Edit Mode)"
            note="border red-500 / h 36px"
          />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">⚙️ 슈퍼관리자 선택 시 연동 동작</h4>
          </div>
          <SpecDetail
            num={12}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            label="역할 = 슈퍼관리자 선택"
            note="baseRole → null 처리"
          />
          <SpecDetail
            num={13}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm disabled:opacity-50 disabled:bg-[#f5f5f5]"
            label="관리자 권한 자동 disabled"
            note="역할이 슈퍼관리자일 때 항상 비활성"
          />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">📐 Edit Mode 버튼</h4>
          </div>
          <SpecDetail num={3} className="border border-[#e5e5e5] text-[#111] h-[40px] rounded-lg px-6 text-[14px] font-medium" label="취소 Button" note="Border #e5e5e5 / h 40px" />
          <SpecDetail num={4} className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 text-[14px] font-medium" label="저장 Button" note="Bg #004a9c / h 40px" />

          <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded-lg text-[12px] text-amber-800 space-y-1">
            <p className="font-bold">📌 권한 설계 규칙 요약</p>
            <p>· 슈퍼관리자 = adminRole: &quot;슈퍼관리자&quot;, baseRole: null</p>
            <p>· 일반관리자 = adminRole: &quot;일반관리자&quot; + baseRole 유지</p>
            <p>· 일반 사용자 = adminRole: null + baseRole 유지</p>
            <p>· 슈퍼관리자만 관리자 권한 select 편집 가능</p>
            <p>· 역할이 슈퍼관리자이면 관리자 권한 select는 항상 비활성</p>
          </div>
        </div>
      </div>
    </div>
  );
}
