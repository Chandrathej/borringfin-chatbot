"use client";

import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full p-3 rounded-full bg-neutral-700 text-white focus:outline-none border-none ${props.className}`}
    />
  );
}
