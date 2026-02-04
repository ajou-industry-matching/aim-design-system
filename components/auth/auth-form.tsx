"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Building2, User, AtSign } from "lucide-react";

interface AuthFormProps {
  defaultTab?: "ajou" | "company";
  defaultIsSignup?: boolean;
}

export function AuthForm({
  defaultTab = "ajou",
  defaultIsSignup = false,
}: AuthFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ajou" | "company">(defaultTab);
  const [isSignup, setIsSignup] = useState(defaultIsSignup);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    name: "",
    username: "",
    confirmPassword: "",
  });

  const handleGoogleLogin = () => {
    // Redirect to the intermediate loading page
    router.push("/auth/google-loading");
  };

  const handleCompanyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Company login:", {
      email: formData.email,
      password: formData.password,
    });
    alert(
      `기업 로그인:\n이메일: ${formData.email}\n비밀번호: ${formData.password}`
    );
  };

  const handleCompanySignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Company signup:", formData);
    alert(
      `기업 회원가입:\n회사명: ${formData.companyName}\n이름: ${formData.name}\n아이디: ${formData.username}\n이메일: ${formData.email}\n비밀번호: ${formData.password}`
    );
  };

  return (
    <div className="bg-white relative">
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

        .gsi-material-button:not(:disabled):active .gsi-material-button-state,
        .gsi-material-button:not(:disabled):focus .gsi-material-button-state {
          background-color: #303030;
          opacity: 12%;
        }

        .gsi-material-button:not(:disabled):hover {
          box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
            0 1px 3px 1px rgba(60, 64, 67, 0.15);
        }

        .gsi-material-button:not(:disabled):hover .gsi-material-button-state {
          background-color: #303030;
          opacity: 8%;
        }
      `}</style>

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* Title */}
          <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-black text-center">
            AIM AJOU
          </h1>

          {/* Card Container with Tabs */}
          <div className="w-[720px] h-full bg-white rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[#e5e5e5]">
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
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {activeTab === "ajou" ? (
                // Ajou Login - Google OAuth Only
                <div className="flex flex-col gap-6 py-8">
                  <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] text-center">
                    아주대학교 구성원(학생/교수)은 Google 계정으로 로그인하세요
                  </p>
                  <div className="flex justify-center">
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
                  </div>
                </div>
              ) : (
                // Company Login/Signup
                <div className="flex flex-col gap-8 py-4">
                  {!isSignup ? (
                    // Company Login Form
                    <form
                      onSubmit={handleCompanyLogin}
                      className="flex flex-col gap-6"
                    >
                      <div className="flex flex-col gap-4">
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
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button
                          type="submit"
                          className="w-full h-[48px] bg-[#003876] hover:bg-[#003876]/90 text-white rounded-[8px] text-[16px] font-medium leading-[1.5] tracking-[-0.4px]"
                        >
                          로그인
                        </Button>
                        <button
                          type="button"
                          onClick={() => setIsSignup(true)}
                          className="text-[14px] text-[#004a9c] hover:underline"
                        >
                          계정이 없으신가요? 회원가입
                        </button>
                      </div>
                    </form>
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
                        <Button
                          type="submit"
                          className="w-full h-[48px] bg-[#003876] hover:bg-[#003876]/90 text-white rounded-[8px] text-[16px] font-medium leading-[1.5] tracking-[-0.4px]"
                        >
                          회원가입
                        </Button>
                        <button
                          type="button"
                          onClick={() => setIsSignup(false)}
                          className="text-[14px] text-[#004a9c] hover:underline"
                        >
                          이미 계정이 있으신가요? 로그인
                        </button>
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
  );
}
