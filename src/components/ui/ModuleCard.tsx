"use client";

import React from "react";
import * as Icons from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface ModuleCardProps {
  label: string;
  icon: string; // Heroicon name
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ label, icon, onClick }) => {
  const IconComponent = (Icons as any)[icon];

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 18px rgba(0, 200, 255, 0.35)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl cursor-pointer
                 bg-white/5 backdrop-blur-md border border-white/10
                 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {IconComponent && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          <IconComponent className="w-11 h-11 text-white/80 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      )}
      <span className="text-white/90 text-[1.05rem] md:text-lg font-semibold text-center tracking-wide leading-snug">
        {label}
      </span>
    </motion.div>
  );
};

export default ModuleCard;
