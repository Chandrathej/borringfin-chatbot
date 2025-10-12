"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid";
}

export function Button({ variant = "solid", className, ...props }: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none";
  const variants: Record<string, string> = {
    solid: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-700 text-gray-200 hover:bg-neutral-800",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
