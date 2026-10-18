import React from "react";

interface LogoProps {
  variant?: "light" | "dark" | "auto";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const NextSofthrLogo: React.FC<LogoProps> = ({
  variant = "auto",
  showTagline = false,
  size = "md",
  className = "",
}) => {
  // Dimensions
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const taglineSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  const isLight = variant === "light";

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Modern NextSofthr Monogram Logo Icon */}
        <div
          className={`relative ${iconSizes[size]} flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0056b3] via-[#004494] to-[#002244] shadow-md shadow-[#0056b3]/25 p-1.5 border border-white/20`}
        >
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-label="NextSofthr Icon"
          >
            {/* Background geometric accents */}
            <path
              d="M6 28L6 8L15 22L24 8L24 28"
              stroke="white"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lemon green dynamic growth chevron / forward slash */}
            <path
              d="M17 14L28 28H31"
              stroke="#caff33"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lemon green pulse dot */}
            <circle cx="28" cy="8" r="3" fill="#caff33" />
          </svg>
        </div>

        {/* Brand Wordmark */}
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight ${textSizes[size]}`}>
            <span
              className={
                isLight ? "text-white" : "text-[#0b1528] dark:text-white"
              }
            >
              NextSoft
            </span>
            <span className="text-[#0056b3] dark:text-[#60a5fa] drop-shadow-sm font-black">
              hr
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#caff33] ml-0.5 align-baseline"></span>
          </div>
        </div>
      </div>

      {showTagline && (
        <span
          className={`mt-1.5 font-medium tracking-wide ${
            isLight ? "text-blue-100/90" : "text-slate-500 dark:text-slate-400"
          } ${taglineSizes[size]}`}
        >
          People. Payroll. Business. Simplified. Secured.
        </span>
      )}
    </div>
  );
};
export default NextSofthrLogo;
