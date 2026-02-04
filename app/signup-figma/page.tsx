"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Building2, User, AtSign } from "lucide-react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// Design Spec Components - Two Column Layout
// ----------------------------------------------------------------------

// Helper to convert tailwind spacing to px
const getPxValue = (className: string) => {
  const match = className.match(/-(?:(\d+)|\[(\d+)px\])$/);
  if (!match) return null;
  if (match[2]) return `${match[2]}px`;
  const val = parseInt(match[1]);
  if (isNaN(val)) return null;
  return `${val * 4}px`;
};

// Parse all CSS properties
const parseClasses = (className: string) => {
  const classes = className.split(" ");

  const padding = classes.filter((c) => /^p[xytblr]?-/.test(c));
  const margin = classes.filter((c) => /^m[xytblr]?-/.test(c));
  const gap = classes.filter((c) => /^gap-/.test(c));
  const dimensions = classes.filter((c) =>
    /^(w-|h-|max-w|min-h|max-h|flex-1|flex)/.test(c),
  );
  const border = classes.filter((c) => /^border/.test(c));
  const rounded = classes.filter((c) => /^rounded/.test(c));
  const typography = classes.filter((c) =>
    /^(text-|font-|leading-|tracking-)/.test(c),
  );
  const background = classes.filter((c) => /^bg-/.test(c));
  const position = classes.filter((c) =>
    /^(relative|absolute|fixed|sticky|static|top-|right-|bottom-|left-|inset-)/.test(c),
  );
  const layout = classes.filter((c) =>
    /^(overflow-|group|aspect-|object-|cursor-)/.test(c),
  );
  const effects = classes.filter((c) =>
    /^(opacity-|shadow-|transition-|group-hover:)/.test(c),
  );

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

const SpecBadge = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-[11px] font-bold ml-2 z-50 relative">
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
  const {
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
  } = parseClasses(className);

  return (
    <div className="bg-white border-2 border-purple-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-purple-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">
            {num}
          </span>
          {label}
        </span>
        {note && (
          <span className="text-purple-200 text-[11px] font-normal">{note}</span>
        )}
      </div>

      <div className="p-3 space-y-2.5 text-[11px]">
        {/* Spacing */}
        {(padding.length > 0 || margin.length > 0 || gap.length > 0) && (
          <div className="space-y-1">
            <div className="text-orange-700 font-bold text-[10px] uppercase tracking-wider">
              📐 Spacing
            </div>
            {padding.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {padding.map((c, i) => {
                  const px = getPxValue(c);
                  return (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                    >
                      {c}{" "}
                      {px && <span className="text-orange-600">({px})</span>}
                    </span>
                  );
                })}
              </div>
            )}
            {margin.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {margin.map((c, i) => {
                  const px = getPxValue(c);
                  return (
                    <span
                      key={i}
                      className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                    >
                      {c} {px && <span className="text-red-600">({px})</span>}
                    </span>
                  );
                })}
              </div>
            )}
            {gap.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {gap.map((c, i) => {
                  const px = getPxValue(c);
                  return (
                    <span
                      key={i}
                      className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                    >
                      {c}{" "}
                      {px && <span className="text-yellow-600">({px})</span>}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Dimensions */}
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

        {/* Visual Styles */}
        {(border.length > 0 || rounded.length > 0 || background.length > 0) && (
          <div className="space-y-1">
            <div className="text-purple-700 font-bold text-[10px] uppercase tracking-wider">
              🎨 Style
            </div>
            <div className="bg-purple-50 text-purple-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed">
              {[...border, ...rounded, ...background].join(" ")}
            </div>
          </div>
        )}

        {/* Typography */}
        {typography.length > 0 && (
          <div className="space-y-1">
            <div className="text-green-700 font-bold text-[10px] uppercase tracking-wider">
              ✍️ Text
            </div>
            <div className="bg-green-50 text-green-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed break-all">
              {typography.join(" ")}
            </div>
          </div>
        )}

        {/* Position */}
        {position.length > 0 && (
          <div className="space-y-1">
            <div className="text-indigo-700 font-bold text-[10px] uppercase tracking-wider">
              📍 Position
            </div>
            <div className="bg-indigo-50 text-indigo-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed">
              {position.join(" ")}
            </div>
          </div>
        )}

        {/* Layout */}
        {layout.length > 0 && (
          <div className="space-y-1">
            <div className="text-teal-700 font-bold text-[10px] uppercase tracking-wider">
              🎯 Layout
            </div>
            <div className="bg-teal-50 text-teal-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed">
              {layout.join(" ")}
            </div>
          </div>
        )}

        {/* Effects */}
        {effects.length > 0 && (
          <div className="space-y-1">
            <div className="text-pink-700 font-bold text-[10px] uppercase tracking-wider">
              ✨ Effects
            </div>
            <div className="bg-pink-50 text-pink-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed break-all">
              {effects.join(" ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SignupPageFigma() {
  const [activeTab, setActiveTab] = useState<"ajou" | "company">("company");
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    name: "",
    username: "",
    confirmPassword: "",
  });

  const handleGoogleLogin = () => {
    alert("Google OAuth 로그인 기능은 추후 구현 예정입니다.");
  };

  const handleCompanyLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCompanySignup = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 border-b-4 border-purple-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">
          🎨 Design Spec: 회원가입 페이지
        </h2>
        <div className="flex gap-6 text-sm mt-2 text-purple-50">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-100 border border-orange-600"></span>{" "}
            Padding
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-100 border border-red-600"></span>{" "}
            Margin
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-100 border border-yellow-600"></span>{" "}
            Gap
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-100 border border-blue-600"></span>{" "}
            Size
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex max-w-[1800px] mx-auto">
        {/* Left: UI Preview */}
        <div className="flex-1 p-8 bg-gray-50">
          <div className="bg-white relative">
            <SpecBadge num={0} />
            <style jsx>{`
              .gsi-material-button {
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -webkit-appearance: none;
                background-color: white;
                background-image: none;
                border: 1px solid #747775;
                border-radius: 4px;
                box-sizing: border-box;
                color: #1f1f1f;
                cursor: pointer;
                font-family: "Roboto", arial, sans-serif;
                font-size: 14px;
                font-weight: 500;
                height: 40px;
                line-height: 20px;
                letter-spacing: 0.25px;
                outline: none;
                overflow: hidden;
                padding: 0 12px;
                position: relative;
                text-align: center;
                transition: background-color 0.218s, border-color 0.218s,
                  box-shadow 0.218s;
                vertical-align: middle;
                white-space: nowrap;
                width: auto;
                min-width: min-content;
              }

              .gsi-material-button .gsi-material-button-icon {
                height: 18px;
                margin-right: 10px;
                min-width: 18px;
                width: 18px;
              }

              .gsi-material-button .gsi-material-button-content-wrapper {
                align-items: center;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                height: 100%;
                justify-content: flex-start;
                position: relative;
                width: 100%;
              }

              .gsi-material-button .gsi-material-button-contents {
                flex-grow: 0;
                font-family: "Roboto", arial, sans-serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: top;
              }

              .gsi-material-button .gsi-material-button-state {
                transition: opacity 0.218s;
                bottom: 0;
                left: 0;
                opacity: 0;
                position: absolute;
                right: 0;
                top: 0;
              }

              .gsi-material-button:disabled {
                cursor: default;
                background-color: #ffffff61;
                border-color: #1f1f1f1f;
              }

              .gsi-material-button:disabled .gsi-material-button-contents {
                opacity: 38%;
              }

              .gsi-material-button:disabled .gsi-material-button-icon {
                opacity: 38%;
              }

              .gsi-material-button:not(:disabled):active
                .gsi-material-button-state,
              .gsi-material-button:not(:disabled):focus
                .gsi-material-button-state {
                background-color: #303030;
                opacity: 12%;
              }

              .gsi-material-button:not(:disabled):hover {
                box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
                  0 1px 3px 1px rgba(60, 64, 67, 0.15);
              }

              .gsi-material-button:not(:disabled):hover
                .gsi-material-button-state {
                background-color: #303030;
                opacity: 8%;
              }
            `}</style>

            {/* Main Content */}
            <div className="mx-auto max-w-[1440px] px-6 py-12">
              <SpecBadge num={1} />
              <div className="flex flex-col items-center justify-center gap-10">
                {/* Title */}
                <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-black text-center flex items-center gap-2">
                  AIM AJOU
                  <SpecBadge num={2} />
                </h1>

                {/* Card Container with Tabs */}
                <div className="w-[720px] h-full bg-white rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-2 z-10">
                    <SpecBadge num={3} />
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-[#e5e5e5]">
                    <SpecBadge num={4} />
                    <button
                      onClick={() => {
                        setActiveTab("ajou");
                        setIsSignup(false);
                      }}
                      className={`flex-1 flex items-center justify-center px-6 py-4 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] border-b-2 transition-colors ${
                        activeTab === "ajou"
                          ? "border-[#004a9c] text-[#666]"
                          : "border-transparent text-[#999]"
                      }`}
                    >
                      학생/교수
                      {activeTab === "ajou" && <SpecBadge num={5} />}
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("company");
                        setIsSignup(false);
                      }}
                      className={`flex-1 flex items-center justify-center px-6 py-4 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] border-b-2 transition-colors ${
                        activeTab === "company"
                          ? "border-[#004a9c] text-[#666]"
                          : "border-transparent text-[#999]"
                      }`}
                    >
                      기업
                      {activeTab === "company" && <SpecBadge num={5} />}
                    </button>
                  </div>

                  {/* Form Content */}
                  <div className="p-8 relative">
                    <div className="absolute top-2 right-2"><SpecBadge num={6} /></div>
                    {activeTab === "ajou" ? (
                      // Ajou Login - Google OAuth Only
                      <div className="flex flex-col gap-6 py-8">
                        <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] text-center">
                          아주대학교 구성원(학생/교수)은 Google 계정으로
                          로그인하세요
                        </p>
                        <div className="flex justify-center items-center gap-2">
                          <button
                            className="gsi-material-button"
                            onClick={handleGoogleLogin}
                          >
                            <div className="gsi-material-button-state"></div>
                            <div className="gsi-material-button-content-wrapper">
                              <div className="gsi-material-button-icon">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                  style={{ display: "block" }}
                                >
                                  <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                  ></path>
                                  <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                  ></path>
                                  <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                  ></path>
                                  <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                  ></path>
                                  <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                              </div>
                              <span className="gsi-material-button-contents">
                                Sign in with Google
                              </span>
                            </div>
                          </button>
                          <SpecBadge num={7} />
                        </div>
                      </div>
                    ) : (
                      // Company Login/Signup
                      <div className="flex flex-col gap-8 py-4">
                        {!isSignup ? (
                          // Company Login Form
                           <div className="text-center text-gray-500">Login Form View</div>
                        ) : (
                          // Company Signup Form
                          <form
                            onSubmit={handleCompanySignup}
                            className="flex flex-col gap-6"
                          >
                            <div className="flex flex-col gap-4">
                              <div className="relative">
                                <Input
                                  type="text"
                                  placeholder="회사명"
                                  value={formData.companyName}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      companyName: e.target.value,
                                    })
                                  }
                                  className="h-[48px] pl-12 pr-4 border border-[#ccc] rounded-[8px] text-[16px]"
                                  required
                                />
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <div className="absolute right-2 top-2">
                                    <SpecBadge num={8} />
                                </div>
                              </div>
                              <div className="relative">
                                <Input
                                  type="text"
                                  placeholder="이름"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                  }
                                  className="h-[48px] pl-12 pr-4 border border-[#ccc] rounded-[8px] text-[16px]"
                                  required
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                              <div className="relative">
                                <Input
                                  type="text"
                                  placeholder="아이디"
                                  value={formData.username}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      username: e.target.value,
                                    })
                                  }
                                  className="h-[48px] pl-12 pr-4 border border-[#ccc] rounded-[8px] text-[16px]"
                                  required
                                />
                                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                              <div className="relative">
                                <Input
                                  type="email"
                                  placeholder="이메일"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                  className="h-[48px] pl-12 pr-4 border border-[#ccc] rounded-[8px] text-[16px]"
                                  required
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                              <div className="relative">
                                <Input
                                  type="password"
                                  placeholder="비밀번호"
                                  value={formData.password}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      password: e.target.value,
                                    })
                                  }
                                  className="h-[48px] pl-12 pr-4 border border-[#ccc] rounded-[8px] text-[16px]"
                                  required
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                              <div className="relative">
                                <Input
                                  type="password"
                                  placeholder="비밀번호 확인"
                                  value={formData.confirmPassword}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      confirmPassword: e.target.value,
                                    })
                                  }
                                  className="h-[48px] pl-12 pr-4 border border-[#ccc] rounded-[8px] text-[16px]"
                                  required
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                            </div>

                            <div className="flex flex-col gap-3">
                               <div className="flex items-center gap-2 w-full">
                                <Button
                                  type="submit"
                                  className="w-full h-[48px] bg-[#003876] hover:bg-[#003876]/90 text-white rounded-[8px] text-[16px] font-medium leading-[1.5] tracking-[-0.4px]"
                                >
                                  회원가입
                                </Button>
                                 <SpecBadge num={9} />
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setIsSignup(false)}
                                  className="text-[14px] text-[#004a9c] hover:underline"
                                >
                                  이미 계정이 있으신가요? 로그인
                                </button>
                                 <SpecBadge num={10} />
                                </div>
                              </div>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="w-[450px] p-8 bg-purple-50 border-l-4 border-purple-500">
          <h3 className="text-purple-900 font-bold text-lg mb-6 bg-purple-50 py-2">
            📋 컴포넌트 스펙
          </h3>

          <SpecDetail
            num={0}
            className="bg-white relative"
            label="Page Background"
          />
          <SpecDetail
            num={1}
            className="mx-auto max-w-[1440px] px-6 py-12"
            label="Main Container"
          />
          <SpecDetail
            num={2}
            className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-black text-center"
            label="H1 Title"
          />
          <SpecDetail
            num={3}
            className="w-[720px] h-full bg-white rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] overflow-hidden"
            label="Auth Card"
          />
          <SpecDetail
            num={4}
            className="flex border-b border-[#e5e5e5]"
            label="Tabs Container"
          />
          <SpecDetail
            num={5}
            className="flex-1 flex items-center justify-center px-6 py-4 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] border-b-2 transition-colors border-[#004a9c] text-[#666]"
            label="Active Tab"
          />
          <SpecDetail
            num={6}
            className="p-8"
            label="Content Area"
          />
          <SpecDetail
            num={7}
            className="gsi-material-button"
            label="Google Button"
            note="Custom CSS: bg:white, border:1px #747775, rounded:4px, h:40px, font:Roboto 14px"
          />
           <SpecDetail
            num={8}
            className="h-[48px] pl-12 pr-4 border border-[#ccc] rounded-[8px] text-[16px]"
            label="Input Field"
            note="Repeated for all fields"
          />
          <SpecDetail
            num={9}
            className="w-full h-[48px] bg-[#003876] hover:bg-[#003876]/90 text-white rounded-[8px] text-[16px] font-medium leading-[1.5] tracking-[-0.4px]"
            label="Primary Button"
          />
          <SpecDetail
            num={10}
            className="text-[14px] text-[#004a9c] hover:underline"
            label="Text Link"
          />
        </div>
      </div>
    </div>
  );
}
