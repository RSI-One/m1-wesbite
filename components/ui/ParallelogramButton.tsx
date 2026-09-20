import React from "react";
import Link from "next/link";

interface ParallelogramButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "white" | "silver" | "gold";
  className?: string;
  isExternal?: boolean;
}

export default function ParallelogramButton({
  children,
  href,
  onClick,
  variant = "white",
  className = "",
  isExternal = false,
}: ParallelogramButtonProps) {
  const variantStyles = {
    white: "bg-white text-black hover:bg-zinc-200 border-white",
    silver: "bg-zinc-300 text-black hover:bg-zinc-100 border-zinc-300",
    gold: "bg-[#D4AF37] text-black hover:bg-[#E5C158] border-[#D4AF37]",
  };

  const baseClasses = `relative inline-flex items-center justify-center px-7 py-3 font-semibold text-xs tracking-wider uppercase transition-all duration-200 -skew-x-12 border select-none group shadow-sm active:scale-95 ${variantStyles[variant]} ${className}`;

  const content = <span className="inline-block skew-x-12">{children}</span>;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
