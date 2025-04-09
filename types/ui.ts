import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "gray" | "pink" | "danger";
}

export interface TooltipProps {
  children: ReactNode;
  message: string;
}
