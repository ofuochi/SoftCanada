import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  theme?: "dark" | "light";
  size?: "small" | "medium" | "large";
  path?: string;
  src?: string | null;
}

export default function Logo({
  theme = "dark",
  size = "medium",
  path = "/",
  src = theme === "dark" ? "/dark_logo.svg" : "/light_logo.svg",
}: LogoProps) {
  // Tailwind CSS classes for scaling based on size prop
  const sizeClasses = classNames({
    "h-12 w-12": size === "small",
    "h-16 w-16": size === "medium",
    "h-20 w-22": size === "large",
  });

  return (
    <Link href={path} aria-label="Home">
      <Image
        src={src!}
        alt={`${theme} theme logo`}
        width={96}
        height={96}
        priority
        className={`object-contain ${sizeClasses}`}
      />
    </Link>
  );
}

