import * as React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-label="DNSChecker.space logo"
      role="img"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="logo-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00FF87" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect width="32" height="32" rx="7" ry="7" fill="url(#logo-bg)" />
      {/* Globe outline */}
      <circle cx="16" cy="16" r="9" fill="none" stroke="url(#logo-accent)" strokeWidth="1.5" opacity="0.35" />
      {/* Horizontal arc */}
      <ellipse cx="16" cy="16" rx="9" ry="4" fill="none" stroke="url(#logo-accent)" strokeWidth="1.2" opacity="0.3" />
      {/* Vertical arc */}
      <ellipse cx="16" cy="16" rx="4" ry="9" fill="none" stroke="url(#logo-accent)" strokeWidth="1.2" opacity="0.3" />
      {/* Stylized "D" */}
      <path
        d="M12 8.5 L12 23.5 L17 23.5 Q23.5 23.5 23.5 16 Q23.5 8.5 17 8.5 Z"
        fill="none"
        stroke="url(#logo-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Network nodes */}
      <circle cx="12" cy="8.5" r="1.6" fill="#00E5FF" />
      <circle cx="12" cy="23.5" r="1.6" fill="#00FF87" />
      <circle cx="23" cy="16" r="1.6" fill="#00E5FF" />
      {/* Signal dots */}
      <circle cx="21" cy="9.5" r="0.9" fill="#00FF87" opacity="0.8" />
      <circle cx="24" cy="12" r="0.7" fill="#00E5FF" opacity="0.6" />
    </svg>
  );
}

export default Logo;
