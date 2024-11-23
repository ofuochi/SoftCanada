import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

interface LogoProps {
  theme?: "dark" | "light";
  size?: "small" | "medium" | "large";
}

export default function Logo({ theme = "dark", size = "medium" }: LogoProps) {
  const logoSrc = theme === "dark" ? "/dark_logo.svg" : "/light_logo.svg";

  // Tailwind CSS classes for scaling based on size prop
  const sizeClasses = classNames({
    "h-12 w-12": size === "small",
    "h-16 w-16": size === "medium",
    "h-24 w-24": size === "large",
  });

  return (
    <Link href="/" aria-label="Home">
      <Image
        src={logoSrc}
        alt={`${theme} theme logo`}
        layout="intrinsic"
        width={96}
        height={96}
        priority
        className={`object-contain ${sizeClasses}`}
      />
    </Link>
  );
}
