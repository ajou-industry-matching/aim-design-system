import Image from "next/image";
import Link from "next/link";
import { Heart, MessageSquare, Eye } from "lucide-react";

interface PortfolioCardProps {
  id: string;
  thumbnail: string;
  tags: string[];
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  views: number;
}

export function PortfolioCard({
  id,
  thumbnail,
  tags,
  title,
  description,
  author,
  date,
  likes,
  comments,
  views,
}: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${id}`} className="flex flex-col group">
      {/* Thumbnail */}
      <div className="relative aspect-[360/203] w-full border border-[#e5e5e5] border-b-0 rounded-t-xl overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="bg-white border border-[#e5e5e5] flex flex-col gap-4 p-6 rounded-b-xl">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="border border-[#003876] text-[#003876] text-[12px] font-medium leading-[1.33] tracking-[-0.3px] px-3 py-1 rounded-xl"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-[#333] text-[20px] font-semibold leading-[1.4] tracking-[-0.5px] line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px] line-clamp-1">
          {description}
        </p>

        {/* Author and Date */}
        <div className="flex items-center gap-1">
          <span className="text-[#808080] text-[12px] leading-[1.33] tracking-[-0.3px]">
            {author}
          </span>
          <div className="w-[2px] h-[2px] bg-[#808080] rounded-full" />
          <span className="text-[#808080] text-[12px] leading-[1.33] tracking-[-0.3px]">
            {date}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-[#808080]" />
            <span className="text-[#808080] text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
              {likes}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-[#808080]" />
            <span className="text-[#808080] text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
              {comments}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-[#808080]" />
            <span className="text-[#808080] text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
              {views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
