import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "filled" | "primary";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  filled:  "bg-foreground text-background hover:opacity-90",
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8  px-4 text-sm",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-sm",
};

const baseClasses =
  "inline-flex items-center justify-center w-full sm:w-auto sm:min-w-48 rounded-md font-semibold no-underline transition-colors cursor-pointer";

export default function Button({
  children,
  variant = "filled",
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const cls = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} onClick={onClick} className={cls}>
          {children}
        </Link>
      );
    }
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
