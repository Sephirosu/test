"use client";

import React from "react";
import type { ButtonProps } from "@/types/ui"; 

export default function Button({
  children,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded text-white disabled:opacity-50 transition-colors";

  const variants = {
    default: "bg-blue-500 hover:bg-blue-600",
    gray: "bg-gray-500 hover:bg-gray-600",
    pink: "bg-pink-500 hover:bg-pink-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button {...props} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
