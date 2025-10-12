"use client";

import React from "react";
import * as Icons from "@heroicons/react/24/outline";

interface ModuleCardProps {
  label: string;
  icon: string; // Heroicon name
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ label, icon, onClick }) => {
  const IconComponent = (Icons as any)[icon];

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl cursor-pointer
                 bg-white/5 backdrop-blur-md border border-white/10
                 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
    >
      {IconComponent && (
        <IconComponent className="w-10 h-10 text-white/70 hover:text-white transition-colors duration-300" />
      )}
      <span className="text-white/80 font-semibold text-center hover:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
  );
};

export default ModuleCard;
