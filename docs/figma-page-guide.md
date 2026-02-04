# Figma 디자인 스펙 페이지 제작 가이드

## 개요

이 문서는 기존 페이지의 디자인 스펙을 시각화하는 `-figma` 페이지를 만드는 방법을 설명합니다.

## 목적

- 프론트엔드 개발자가 UI 컴포넌트의 정확한 Tailwind CSS 속성을 한눈에 확인
- 전체 페이지를 캡처하여 이미지 형태로 공유 가능
- 마진, 패딩, gap 등 모든 CSS 속성을 상세히 문서화

## 파일 구조

```
app/
  create/
    notice/
      page.tsx          # 원본 페이지
    notice-figma/
      page.tsx          # 디자인 스펙 페이지
    portfolio/
      page.tsx          # 원본 페이지
    portfolio-figma/
      page.tsx          # 디자인 스펙 페이지
```

## 제작 단계

### 1. 원본 페이지 분석

원본 페이지의 모든 컴포넌트와 Tailwind CSS 클래스를 확인합니다.

```bash
# 원본 페이지에서 className 추출
grep -n "className=" app/create/notice/page.tsx
```

### 2. Figma 페이지 생성

새로운 `-figma` 디렉토리를 생성하고 `page.tsx` 파일을 만듭니다.

```typescript
"use client";

import { useState } from "react";
// 필요한 컴포넌트 import...

// 스펙 컴포넌트 정의
const getPxValue = (className: string) => {
  // Tailwind 클래스를 px 값으로 변환
};

const parseClasses = (className: string) => {
  // CSS 클래스를 카테고리별로 분류
  return {
    padding,
    margin,
    gap,
    dimensions,
    border,
    rounded,
    typography,
    background,
    position,
    layout,
    effects,
  };
};

const SpecBadge = ({ num }: { num: number }) => {
  // 번호가 표시된 배지
};

const SpecDetail = ({ num, className, label, note }) => {
  // 상세 스펙 카드
};

export default function PageNameFigma() {
  // 2-column 레이아웃 구현
}
```

### 3. 레이아웃 구조

#### 헤더
```tsx
<div className="bg-gradient-to-r from-[color]-600 to-[color]-500 p-4 border-b-4 border-[color]-700 shadow-lg">
  <h2 className="text-white font-bold text-xl">
    🎨 Design Spec: [페이지명]
  </h2>
  <div className="flex gap-6 text-sm mt-2 text-[color]-50">
    {/* 범례 표시 */}
  </div>
</div>
```

#### 2-Column 레이아웃
```tsx
<div className="flex max-w-[1800px] mx-auto">
  {/* Left: UI Preview */}
  <div className="flex-1 p-8 bg-gray-50">
    {/* 원본 UI + SpecBadge */}
  </div>

  {/* Right: Spec Details */}
  <div className="w-[450px] p-8 bg-[color]-50 border-l-4 border-[color]-500">
    <h3 className="text-[color]-900 font-bold text-lg mb-6">
      📋 컴포넌트 스펙
    </h3>
    {/* SpecDetail 컴포넌트들 */}
  </div>
</div>
```

### 4. 컴포넌트별 번호 할당

각 컴포넌트에 순차적으로 번호를 할당합니다:

- **0번**: Page Container (최상위 컨테이너)
- **1번**: H1 Title
- **2번**: Subtitle
- **3번**: Section H2
- **4번**: Section Container
- 이후 페이지 구조에 따라 순차 할당

#### 번호 할당 원칙

1. **계층 구조 순서**: 상위 컨테이너부터 하위 요소로
2. **화면 표시 순서**: 위에서 아래로, 왼쪽에서 오른쪽으로
3. **공통 컴포넌트**: 첫 번째 인스턴스에 번호 할당, note에 "공통" 표시
4. **그룹 요소**: 컨테이너 먼저, 내부 요소 나중에

### 5. SpecBadge 추가

원본 UI의 각 요소에 `SpecBadge` 컴포넌트를 추가합니다.

```tsx
<div className="flex items-center">
  <h1 className="...">제목 <SpecBadge num={1} /></h1>
</div>
```

**배치 원칙**:
- 인라인 요소: 텍스트 오른쪽에 배치
- 블록 요소: `flex items-start gap-2`로 감싸서 오른쪽에 배치
- 중첩 구조: 각 레벨마다 별도 배지 할당

### 6. SpecDetail 작성

각 컴포넌트에 대한 상세 스펙을 작성합니다.

```tsx
<SpecDetail
  num={1}
  className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333] mb-2"
  label="H1 Title"
  note="optional note"
/>
```

**className 작성 원칙**:
- 원본 페이지의 정확한 클래스를 그대로 복사
- 순서는 원본과 동일하게 유지
- 공백, 대소문자 모두 일치시킴

### 7. CSS 속성 파싱

`parseClasses` 함수는 다음 카테고리로 CSS를 분류합니다:

| 카테고리 | 아이콘 | 색상 | 포함 클래스 |
|---------|-------|------|------------|
| Spacing | 📐 | orange/red/yellow | p-*, m-*, gap-* |
| Size | 📏 | blue | w-*, h-*, max-w-*, min-h-* |
| Style | 🎨 | purple | border-*, rounded-*, bg-* |
| Text | ✍️ | green | text-*, font-*, leading-*, tracking-* |
| Position | 📍 | indigo | relative, absolute, top-*, right-* |
| Layout | 🎯 | teal | overflow-*, group, aspect-*, cursor-* |
| Effects | ✨ | pink | opacity-*, shadow-*, transition-* |

### 8. 예제 상태 표시

실제 사용 예시를 보여주기 위해 샘플 데이터를 추가합니다:

```tsx
const [formData, setFormData] = useState({
  tags: ["React", "TypeScript"],  // 태그 예시
  attachments: [],
  // ...
});
```

- 파일 첨부: 샘플 파일 카드 표시
- 이미지 업로드: 썸네일 프리뷰 표시
- 태그 입력: 입력된 태그 배지 표시

### 9. 스크롤 제거

오른쪽 스펙 패널에서 overflow 스크롤을 제거하여 전체 캡처가 가능하도록 합니다.

```tsx
// ❌ 제거
<div className="w-[450px] p-8 bg-blue-50 border-l-4 border-blue-500 overflow-y-auto max-h-screen">

// ✅ 적용
<div className="w-[450px] p-8 bg-blue-50 border-l-4 border-blue-500">
```

### 10. 검증 및 비교

원본 페이지와 figma 페이지를 비교하여 모든 스펙이 정확한지 확인합니다.

```bash
# 원본과 figma 페이지의 className 비교
diff <(grep "className=" app/create/notice/page.tsx) \
     <(grep "className=" app/create/notice-figma/page.tsx)
```

## 체크리스트

제작 완료 전 확인사항:

- [ ] 모든 컴포넌트에 번호가 할당되었는가?
- [ ] 원본 페이지의 모든 섹션이 포함되었는가?
- [ ] SpecDetail의 className이 원본과 정확히 일치하는가?
- [ ] 색상 값(text-[#333] 등)이 누락되지 않았는가?
- [ ] 예제 상태(파일, 태그 등)가 표시되는가?
- [ ] 스크롤 없이 전체 스펙이 보이는가?
- [ ] 번호가 위에서 아래로 순차적으로 정렬되었는가?
- [ ] 중복되는 컴포넌트는 "공통" note가 있는가?

## 테마 컬러 가이드

각 페이지는 고유한 테마 컬러를 사용합니다:

| 페이지 | 주 컬러 | 헤더 그라데이션 |
|-------|--------|---------------|
| Notice | Blue | from-blue-600 to-blue-500 |
| Portfolio | Purple | from-purple-600 to-purple-500 |

## 향후 개선사항

### Wrapper 컴포넌트화

현재 각 페이지에서 반복되는 코드를 컴포넌트로 분리하여 재사용성을 높일 수 있습니다.

#### 제안: SpecWrapper 컴포넌트

```tsx
// components/design-spec/SpecWrapper.tsx
interface SpecWrapperProps {
  title: string;
  themeColor: 'blue' | 'purple' | 'green';
  children: React.ReactNode;
  specs: React.ReactNode;
}

export function SpecWrapper({ title, themeColor, children, specs }: SpecWrapperProps) {
  const colorClasses = {
    blue: {
      header: 'from-blue-600 to-blue-500 border-blue-700',
      headerText: 'text-blue-50',
      panel: 'bg-blue-50 border-blue-500',
      panelText: 'text-blue-900',
      badge: 'bg-blue-600',
    },
    purple: {
      header: 'from-purple-600 to-purple-500 border-purple-700',
      headerText: 'text-purple-50',
      panel: 'bg-purple-50 border-purple-500',
      panelText: 'text-purple-900',
      badge: 'bg-purple-600',
    },
    // ... 다른 색상
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClasses[themeColor].header} p-4 border-b-4 shadow-lg`}>
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: {title}</h2>
        {/* 범례 */}
      </div>

      {/* Two Column Layout */}
      <div className="flex max-w-[1800px] mx-auto">
        {/* Left: UI Preview */}
        <div className="flex-1 p-8 bg-gray-50">
          {children}
        </div>

        {/* Right: Spec Details */}
        <div className={`w-[450px] p-8 ${colorClasses[themeColor].panel} border-l-4`}>
          <h3 className={`${colorClasses[themeColor].panelText} font-bold text-lg mb-6 py-2`}>
            📋 컴포넌트 스펙
          </h3>
          {specs}
        </div>
      </div>
    </div>
  );
}
```

#### 사용 예시

```tsx
// app/create/notice-figma/page.tsx
import { SpecWrapper } from '@/components/design-spec/SpecWrapper';
import { SpecBadge, SpecDetail } from '@/components/design-spec';

export default function NoticePageFigma() {
  return (
    <SpecWrapper
      title="공지사항 작성 페이지"
      themeColor="blue"
      specs={
        <>
          <SpecDetail num={0} className="..." label="Page Container" />
          <SpecDetail num={1} className="..." label="H1 Title" />
          {/* ... */}
        </>
      }
    >
      {/* 원본 UI */}
      <div className="mx-auto max-w-[1440px] py-12 px-4 md:px-8">
        <SpecBadge num={0} />
        {/* ... */}
      </div>
    </SpecWrapper>
  );
}
```

#### SpecBadge 컴포넌트화

```tsx
// components/design-spec/SpecBadge.tsx
interface SpecBadgeProps {
  num: number;
  color?: string;
}

export function SpecBadge({ num, color = 'blue' }: SpecBadgeProps) {
  const colorClasses = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
  };

  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 ${colorClasses[color]} text-white rounded-full text-[11px] font-bold ml-2`}>
      {num}
    </span>
  );
}
```

#### SpecDetail 컴포넌트화

```tsx
// components/design-spec/SpecDetail.tsx
import { parseClasses, getPxValue } from '@/lib/design-spec-utils';

interface SpecDetailProps {
  num: number;
  className: string;
  label: string;
  note?: string;
  themeColor?: 'blue' | 'purple' | 'green';
}

export function SpecDetail({
  num,
  className,
  label,
  note,
  themeColor = 'blue'
}: SpecDetailProps) {
  const colorClasses = {
    blue: {
      border: 'border-blue-500',
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      noteText: 'text-blue-200',
    },
    purple: {
      border: 'border-purple-500',
      bg: 'bg-purple-500',
      text: 'text-purple-600',
      noteText: 'text-purple-200',
    },
    // ...
  };

  const parsed = parseClasses(className);

  return (
    <div className={`bg-white border-2 ${colorClasses[themeColor].border} rounded-lg overflow-hidden mb-4`}>
      {/* 헤더 */}
      <div className={`${colorClasses[themeColor].bg} text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between`}>
        {/* ... */}
      </div>

      {/* 속성들 */}
      <div className="p-3 space-y-2.5 text-[11px]">
        {/* Spacing, Size, Style, Text, Position, Layout, Effects */}
      </div>
    </div>
  );
}
```

#### 유틸리티 함수 분리

```tsx
// lib/design-spec-utils.ts
export function getPxValue(className: string): string | null {
  const match = className.match(/-(?:(\d+)|\[(\d+)px\])$/);
  if (!match) return null;
  if (match[2]) return `${match[2]}px`;
  const val = parseInt(match[1]);
  if (isNaN(val)) return null;
  return `${val * 4}px`;
}

export function parseClasses(className: string) {
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
    position: classes.filter((c) => /^(relative|absolute|fixed|sticky|static|top-|right-|bottom-|left-|inset-)/.test(c)),
    layout: classes.filter((c) => /^(overflow-|group|aspect-|object-|cursor-)/.test(c)),
    effects: classes.filter((c) => /^(opacity-|shadow-|transition-|group-hover:)/.test(c)),
  };
}
```

#### 컴포넌트화의 장점

1. **코드 재사용**: 새로운 figma 페이지 생성 시 보일러플레이트 코드 감소
2. **일관성**: 모든 스펙 페이지가 동일한 스타일과 동작 보장
3. **유지보수성**: 한 곳에서 수정하면 모든 페이지에 반영
4. **확장성**: 새로운 테마 컬러나 기능 추가가 용이

#### 마이그레이션 계획

1. **Phase 1**: 유틸리티 함수 분리 (`lib/design-spec-utils.ts`)
2. **Phase 2**: SpecBadge, SpecDetail 컴포넌트화
3. **Phase 3**: SpecWrapper 컴포넌트 생성
4. **Phase 4**: 기존 페이지들 마이그레이션
   - notice-figma
   - portfolio-figma
   - 향후 추가될 페이지들

## 참고 자료

- 원본 페이지: `app/create/notice/page.tsx`, `app/create/portfolio/page.tsx`
- Figma 페이지: `app/create/notice-figma/page.tsx`, `app/create/portfolio-figma/page.tsx`
- Tailwind CSS 문서: https://tailwindcss.com/docs
