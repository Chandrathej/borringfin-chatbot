"use client";

import * as React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label
      className={`text-gray-200 text-sm md:text-base ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  );
};
