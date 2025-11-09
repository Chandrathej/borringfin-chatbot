"use client";

import * as React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, ...props }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="w-5 h-5 rounded border border-neutral-700 text-cyan-500 bg-neutral-800 focus:ring-2 focus:ring-cyan-400 cursor-pointer"
      {...props}
    />
  );
};
