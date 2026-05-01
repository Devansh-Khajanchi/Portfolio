import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type Variant = "filled" | "primary";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  filled:
    "bg-foreground text-background hover:opacity-90 active:opacity-75",
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:brightness-90",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8  px-4 text-sm",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-sm",
};

const baseClasses =
  "inline-flex items-center justify-center w-full sm:w-auto sm:min-w-48 rounded-xl font-semibold no-underline transition-all cursor-pointer select-none";

const disabledClasses =
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none " +
  "aria-disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none";

export default function Button({
  children,
  variant = "filled",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const cls = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`.trim();

  if (href && !disabled) {
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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
    >
      {children}
    </button>
  );
}
