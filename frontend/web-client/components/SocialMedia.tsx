import React from "react";
import Link from "next/link";
import { socialLink } from "@/constants/SocialMedia";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
const SocialMedia = () => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        {socialLink?.map((item) => {
          const IconComponent = item.icon;

          return (
            <Tooltip key={item.title}>
              <TooltipTrigger>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </Link>
              </TooltipTrigger>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
