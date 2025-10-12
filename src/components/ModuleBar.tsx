"use client";

import React from "react";
import ModuleCard from "./ui/ModuleCard";

interface ModuleBarProps {
  onModuleClick: (moduleName: string) => void;
}

const modules = [
  { label: "Debt & Liability", icon: "BanknotesIcon" },
  { label: "Tax Planning", icon: "CalculatorIcon" },
  { label: "Goal Planning", icon: "FlagIcon" },
  { label: "Expense Analysis", icon: "ChartPieIcon" },
  { label: "Insurance", icon: "ShieldCheckIcon" },
  { label: "Investment", icon: "CurrencyDollarIcon" },
  { label: "Financial Education", icon: "BookOpenIcon" },
];

const ModuleBar: React.FC<ModuleBarProps> = ({ onModuleClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.label}
          label={module.label}
          icon={module.icon}
          onClick={() => onModuleClick(module.label)}
        />
      ))}
    </div>
  );
};

export default ModuleBar;
