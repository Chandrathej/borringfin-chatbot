"use client";

import * as React from "react";

interface Option {
  value: string;
  label: string | React.ReactNode;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onValueChange: (val: string) => void;
  options: Option[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
  ...props
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`bg-neutral-800 border border-neutral-700 text-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className || ""}`}
      {...props}
    >
      {/* Default placeholder option */}
      <option value="" disabled hidden>
        {placeholder}
      </option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
