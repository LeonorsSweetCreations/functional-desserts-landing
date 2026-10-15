import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-brand-teal disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-brand-pink text-brand-ink hover:bg-brand-rose hover:text-white shadow-card",
  secondary: "bg-brand-teal-dark text-white hover:bg-brand-teal",
  ghost: "bg-transparent text-brand-teal-dark hover:bg-brand-teal-pale",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string; external?: boolean; type?: never; disabled?: never };
type ButtonProps = CommonProps & { href?: never; external?: never; type?: "button" | "submit"; disabled?: boolean };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external || href.startsWith("http")) {
      return (
        <a href={href} className={cls} rel="noopener">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled } = props as ButtonProps;
  return (
    <button type={type} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
