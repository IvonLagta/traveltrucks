import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import css from "./button.module.css";

type ButtonVariant = "mainBtn" | "clearBtn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
}

export default function Button({
  children,
  variant = "mainBtn",
  className,
  href,
  ...props
}: ButtonProps) {
  const variantClass = css[variant];
  const classes = className
    ? `${css.button} ${variantClass} ${className}`
    : `${css.button} ${variantClass}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
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
