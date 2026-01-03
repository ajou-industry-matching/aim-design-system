import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="bg-[#f9f9f9] w-full">
      <div className="mx-auto max-w-[1440px] py-5">
        <div className="flex items-end justify-between">
          {/* Left Section: Logo and Links */}
          <div className="flex items-center gap-10">
            {/* Ajou Logo */}
            <div className="relative h-[60px] w-[232px]">
              <Image
                src="/assets/ajou-logo.svg"
                alt="Ajou University Logo"
                width={232}
                height={60}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Footer Info */}
            <div className="flex flex-col gap-5 text-[#808080] text-[16px] leading-[1.5] tracking-[-0.4px]">
              {/* Links */}
              <div className="flex items-center gap-4 underline">
                <Link href="/terms" className="hover:text-[#666]">
                  이용약관
                </Link>
                <Link href="/privacy" className="hover:text-[#666]">
                  개인정보처리방침
                </Link>
                <Link href="/sitemap" className="hover:text-[#666]">
                  사이트맵
                </Link>
              </div>

              {/* Address and Copyright */}
              <div>
                <p>16499 경기도 수원시 영통구 월드컵로 206 아주대학교</p>
                <p>T. 031-219-2114</p>
                <p>Copyright © 2024 Ajou University. All Rights Reserved.</p>
              </div>
            </div>
          </div>

          {/* Right Section: Social Media Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Instagram className="w-6 h-6 text-[#808080]" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Facebook className="w-6 h-6 text-[#808080]" />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Youtube className="w-6 h-6 text-[#808080]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
