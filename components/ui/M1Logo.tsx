import Image from "next/image";

interface M1LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function M1Logo({
  className = "",
  width = 1302,
  height = 461,
  priority = false,
}: M1LogoProps) {
  return (
    <Image
      src="/m1-logo.png"
      alt="M1 Aviation Logo"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
