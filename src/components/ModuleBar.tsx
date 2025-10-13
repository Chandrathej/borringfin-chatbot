"use client";

import React from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {modules.map((module, index) => (
        <motion.div
          key={module.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="cursor-pointer"
        >
          <ModuleCard
            label={module.label}
            icon={module.icon}
            onClick={() => onModuleClick(module.label)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ModuleBar;
