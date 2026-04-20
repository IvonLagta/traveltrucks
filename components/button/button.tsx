import Link from "next/link";
import type { ButtonProps, ButtonVariant } from "@/types/types";
import css from "./button.module.css";

export default function Button({
  children,
  variant = "mainBtn",
  className,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const variantClass = css[variant];
  const classes = className
    ? `${css.button} ${variantClass} ${className}`
    : `${css.button} ${variantClass}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
